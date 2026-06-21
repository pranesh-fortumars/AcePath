"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        if (data.user.forcePasswordChange) {
          router.push("/reset-password");
        } else {
          router.push("/system");
        }
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      alert("System Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white selection:bg-cyan-500 selection:text-white">
      {/* Background Gradients & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" />
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-600/30 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[150px]" />

      <main className="relative z-10 w-full max-w-md p-8 sm:p-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl backdrop-filter transition-all duration-500 hover:border-white/20">
          
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
              ResumeAI Pro
            </h1>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Single-Owner Development Mode
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-gray-500 transition-all focus:border-cyan-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-cyan-500 group-hover:border-white/20"
                  required
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-gray-500 transition-all focus:border-cyan-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-cyan-500 group-hover:border-white/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 px-5 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-cyan-500/25 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-gray-500">
              Authorized personnel only. Development Mode is active.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
