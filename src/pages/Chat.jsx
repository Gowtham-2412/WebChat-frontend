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
        <div className="h-screen flex flex-col">

            <div className="bg-gray-800 text-white p-3 flex justify-between items-center gap-2">
                <div className="flex items-center gap-3">
                    <button className="md:hidden" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <span>
                        Logged in as : <span className="font-semibold text-red-500 text-lg">{currentUser}</span>
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="flex flex-1 relative">
                <Sidebar 
                    isOpen={isSidebarOpen}
                    onSelectUser={handleSelectUser} 
                />
                <ChatWindow selectedUser={selectedUser} />
            </div>
        </div>
    );
}

export default Chat;
