import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("chat/register/", {
        username,
        password,
      });

      alert("User created successfully");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <main className="auth-shell flex min-h-screen items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-2xl backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
        <section className="p-6 sm:p-10">
          <div className="mx-auto max-w-sm">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-8 text-sm text-slate-400 transition hover:text-white"
            >
              Back to home
            </button>

            <h2 className="text-3xl font-semibold text-white">Create account</h2>
            <p className="mt-2 text-sm text-slate-400">Start chatting in the new dark workspace.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full rounded-2xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">
                Register
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-emerald-300 transition hover:text-emerald-200"
              >
                Login here
              </button>
            </p>
          </div>
        </section>

        <section className="hidden border-l border-white/10 bg-slate-950/20 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Join the network</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
              Set up your account and start messaging in minutes.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              The updated interface gives your app a stronger product feel with better depth, color, and hierarchy.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Dark visual system</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Elevated panels, richer gradients, and cleaner contrast across the whole journey.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Website-style presentation</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                A proper landing page and polished auth screens instead of plain starter layouts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
