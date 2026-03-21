import { useContext, useState } from "react";
import Sidebar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { logout, currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }

    return (
        <div className="min-h-screen bg-transparent p-3 sm:p-5">
            <div className="glass-panel flex min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-[2rem] sm:min-h-[calc(100vh-2.5rem)]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-slate-950/40 px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-100 md:hidden"
                            onClick={toggleSidebar}
                            aria-label="Toggle chats list"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Workspace</p>
                            <p className="text-base font-medium text-white">
                                Logged in as <span className="text-sky-300">{currentUser}</span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-400/20"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex flex-1 relative min-h-0">
                <Sidebar 
                    isOpen={isSidebarOpen}
                    selectedUser={selectedUser}
                    onSelectUser={handleSelectUser} 
                />
                <ChatWindow selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    );
}

export default Chat;
