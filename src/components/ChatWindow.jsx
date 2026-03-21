import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import MessageBubble from "./MessageBubble";
import sendbtn from "../assets/send.svg";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const currentRoomRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;

    initializeChat();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeChat = async () => {
    try {
      let roomId;

      if (selectedUser.room_id) {
        roomId = selectedUser.room_id;
      } else {
        const roomRes = await api.get(`chat/room/${selectedUser.id}/`);
        roomId = roomRes.data.room_id;
      }

      currentRoomRef.current = roomId;

      const historyRes = await api.get(`chat/messages/${roomId}/`);
      setMessages(historyRes.data);

      connectWebSocket(roomId);
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  };

  const connectWebSocket = (roomId) => {
    const token = localStorage.getItem("access");

    if (socketRef.current) {
      socketRef.current.close();
    }

    const baseHttp = import.meta.env.VITE_API_URL;
    const baseWs = baseHttp
      .replace("https://", "wss://")
      .replace("http://", "ws://")
      .replace("/api/", "");

    const socket = new WebSocket(
      `${baseWs}/ws/chat/${roomId}/?token=${token}`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (currentRoomRef.current === roomId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socketRef.current = socket;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!socketRef.current) return;

    socketRef.current.send(
      JSON.stringify({ message: input })
    );

    setInput("");
  };

  if (!selectedUser) {
    return (
      <div className="hidden w-full items-center justify-center md:flex">
        <div className="max-w-lg rounded-[2rem] border border-white/10 bg-slate-950/45 p-10 text-center shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Messages</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Select a chat to start messaging</h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Your conversations appear here with a darker, cleaner layout made for longer chats and faster scanning.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 bg-slate-950/40 px-4 py-4 sm:px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 font-semibold text-sky-300">
          {(selectedUser.username || "?").charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white">{selectedUser.username}</div>
          <div className="text-xs text-slate-400">{selectedUser.is_online ? "Online now" : "Last seen recently"}</div>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 sm:block">
          Encrypted room
        </div>
      </div>

      <div className="message-wallpaper flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} currentUser={currentUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-white/10 bg-slate-950/50 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-2">
        <input
          className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          aria-label="Type a message"
        />
        <button
          onClick={sendMessage}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-300 disabled:opacity-50"
          aria-label="Send message"
        >
          <img src={sendbtn} alt="" className="w-5 brightness-0" />
        </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
