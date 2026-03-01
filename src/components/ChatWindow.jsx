import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import MessageBubble from "./MessageBubble";
import sendbtn from '../assets/send.svg'

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const currentRoomRef = useRef(null);
  const { currentUser } = useContext(AuthContext)
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
      // Handle error appropriately, e.g., show a notification
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
      <div className="hidden md:flex w-full items-center justify-center text-gray-400">
        <p className="text-2xl">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">{(selectedUser.username||"?").charAt(0).toUpperCase()}</div>
        <div className="flex-1">
          <div className="font-semibold">{selectedUser.username}</div>
          <div className="text-xs text-gray-500">{selectedUser.is_online ? "Online" : "Last seen recently"}</div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} currentUser={currentUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 flex items-center gap-3 border-t bg-white">
        <input
          className="flex-1 border border-gray-200 p-3 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          aria-label="Type a message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50"
          aria-label="Send message"
        >
          <img src={sendbtn} alt="" className="w-5"/>
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
