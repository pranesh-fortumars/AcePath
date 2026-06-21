"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // In a real flow, you would call the backend to reset the password.
      // For this Single-Owner Development Mode mock, we just proceed.
      localStorage.setItem("viewAsRole", "ADMIN");
      router.push("/system");
    } catch (err) {
      console.error(err);
      alert("System Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white selection:bg-rose-500 selection:text-white">
      {/* Background Gradients & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-black to-black" />
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-rose-600/20 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-orange-700/20 blur-[150px]" />

      <main className="relative z-10 w-full max-w-md p-8 sm:p-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl backdrop-filter transition-all duration-500 hover:border-white/20">
          
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              Action Required
            </h1>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Please change your default password
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-gray-500 transition-all focus:border-rose-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-rose-500 group-hover:border-white/20"
                  required
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white placeholder-gray-500 transition-all focus:border-rose-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-rose-500 group-hover:border-white/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 px-5 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-rose-500/25 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? "Updating..." : "Secure Account & Continue"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
