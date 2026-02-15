import { useEffect, useState } from "react";
import api from "../api/axios";

function Sidebar({ isOpen, onSelectUser }) {
  const [chatUsers, setChatUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    try {
      const chatsRes = await api.get("chat/my-chats/");
      const usersRes = await api.get("chat/users/");

      const chattedIds = chatsRes.data.map((u) => u.id);

      const filteredOthers = usersRes.data.filter(
        (u) => !chattedIds.includes(u.id)
      );

      setChatUsers(chatsRes.data);
      setOtherUsers(filteredOthers);
    } catch (error) {
      console.error("Failed to fetch sidebar data:", error);
    }
  };

  return (
    <div
      className={`
        ${isOpen ? "block" : "hidden"} md:block 
        absolute md:relative 
        w-full md:w-1/4 
        bg-gray-200 p-4 overflow-y-auto 
        h-full z-10
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Chats</h2>
      </div>


      {/* Previous Chats */}
      {chatUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="p-2 bg-white mb-2 rounded cursor-pointer hover:bg-gray-100"
        >
          {user.username}
        </div>
      ))}

      {/* Divider */}
      {otherUsers.length > 0 && (
        <div className="mt-4 mb-2 text-sm text-gray-500">
          Other Users
        </div>
      )}

      {/* New Users */}
      {otherUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="p-2 bg-gray-100 mb-2 rounded cursor-pointer hover:bg-gray-200"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
