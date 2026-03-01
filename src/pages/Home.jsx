import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/chat" replace />;
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Web Chat</h1>

            <div className="space-x-4">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/register")}
                    className="bg-green-500 text-white px-6 py-2 rounded"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Home;
