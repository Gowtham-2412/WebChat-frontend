import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () =>{
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("token/", { username, password });
      login(res.data.access, res.data.refresh);
      navigate("/chat");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="auth-shell flex min-h-screen items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-2xl backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden border-r border-white/10 bg-slate-950/20 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">WebChat</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
              Welcome back to your conversation hub.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Jump into your messages with a calmer dark interface built for focus, presence, and fast replies.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Why it feels better</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>Cleaner contrast for long chat sessions</li>
              <li>Faster visual scanning across conversations</li>
              <li>Product-style layout instead of a basic demo form</li>
            </ul>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mx-auto max-w-sm">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-8 text-sm text-slate-400 transition hover:text-white"
            >
              Back to home
            </button>

            <h2 className="text-3xl font-semibold text-white">Login</h2>
            <p className="mt-2 text-sm text-slate-400">Sign in to continue chatting.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full rounded-2xl bg-sky-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-sky-300">
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Need an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium text-sky-300 transition hover:text-sky-200"
              >
                Create one here
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
