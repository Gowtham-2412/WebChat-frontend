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
        <main className="relative min-h-screen overflow-hidden hero-grid">
            <div className="absolute inset-0 bg-slate-950/35" />
            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
                <header className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/35 px-5 py-3 backdrop-blur">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-sky-300">WebChat</p>
                        <p className="text-xs text-slate-400">Realtime conversations, redesigned</p>
                    </div>
                    <button
                        onClick={() => navigate("/login")}
                        className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:bg-sky-400/20"
                    >
                        Sign in
                    </button>
                </header>

                <section className="flex flex-1 items-center py-12 lg:py-16">
                    <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <div className="max-w-2xl">
                            <p className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-200">
                                Built for fast, focused conversations
                            </p>
                            <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
                                A dark, modern chat workspace that feels like a real product.
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                                Keep conversations organized, move between people quickly, and message in a cleaner interface designed for long sessions.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <button
                                    onClick={() => navigate("/register")}
                                    className="rounded-full bg-sky-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-300"
                                >
                                    Create account
                                </button>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                                >
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
                            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-400">Live workspace</p>
                                        <h2 className="text-xl font-semibold text-white">Team Lounge</h2>
                                    </div>
                                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                                        12 online
                                    </span>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="ml-auto max-w-xs rounded-3xl rounded-br-md bg-sky-400 px-4 py-3 text-sm font-medium text-slate-950">
                                        The new dark UI is live. It already feels much cleaner.
                                    </div>
                                    <div className="max-w-xs rounded-3xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                                        Nice. The layout finally feels like a real app instead of a demo page.
                                    </div>
                                    <div className="ml-auto max-w-[17rem] rounded-3xl rounded-br-md bg-slate-800 px-4 py-3 text-sm text-slate-100 ring-1 ring-white/10">
                                        Exactly. Better contrast, better spacing, better flow.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Home;
