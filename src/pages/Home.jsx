import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

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
