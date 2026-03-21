import { useEffect, useState } from "react";
import api from "../api/axios";

function Sidebar({ isOpen, onSelectUser, selectedUser }) {
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
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute inset-0 z-20 flex-col border-r border-white/10 bg-slate-950/96 p-4 md:relative md:z-0 md:flex md:w-[22rem] md:bg-slate-950/50`}
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Direct messages</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Chats</h2>
        <p className="mt-1 text-sm text-slate-400">Pick a conversation or start a new one.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-2">
          {chatUsers.map((user) => {
            const isActive = selectedUser?.id === user.id;
            return (
              <button
                key={user.id}
                type="button"
                onClick={() => onSelectUser(user)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                  isActive
                    ? "border-sky-400/30 bg-sky-400/12 text-white"
                    : "border-white/6 bg-white/[0.03] text-slate-200 hover:border-white/12 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 font-semibold text-sky-300">
                  {(user.username || "?").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{user.username}</p>
                  <p className="truncate text-sm text-slate-400">
                    {user.is_online ? "Online now" : "Tap to open conversation"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {otherUsers.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/8" />
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Discover</p>
              <div className="h-px flex-1 bg-white/8" />
            </div>

            <div className="space-y-2">
              {otherUsers.map((user) => {
                const isActive = selectedUser?.id === user.id;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => onSelectUser(user)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-emerald-400/30 bg-emerald-400/12 text-white"
                        : "border-white/6 bg-slate-900/40 text-slate-300 hover:border-white/12 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 font-semibold text-emerald-300">
                      {(user.username || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{user.username}</p>
                      <p className="truncate text-sm text-slate-500">Start a new chat</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
