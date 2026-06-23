"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, KeyRound, ChevronDown, Terminal, Fingerprint, ShieldAlert, Key } from "lucide-react";

export default function LoginPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const router = useRouter();

  // Inject dummy public API key by default
  useEffect(() => {
    setApiKey("sk-dummy-public-key-abcdef1234567890");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save configuration securely into localStorage to bypass features across the app
      if (apiKey) localStorage.setItem("OPENAI_API_KEY", apiKey);
      localStorage.setItem("ADMIN_BYPASS_MODE", "enabled");

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
        alert("Invalid Local Credentials. (Note: Database fallback layers are active)");
      }
    } catch (err) {
      console.error(err);
      alert("System Authentication Error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] text-white selection:bg-cyan-500 selection:text-white">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712]" />
      
      {/* Animated Glow Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-600/20 blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[150px]" 
      />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-6 sm:p-10"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-3xl backdrop-filter transition-all duration-500 hover:border-white/20">
          
          <div className="mb-8 text-center space-y-3">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 mb-4 shadow-inner"
            >
              <Fingerprint className="h-8 w-8 text-cyan-400" />
            </motion.div>
            
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
              Terminal Access
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
              <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                Owner Override Mode Active
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Standard Credentials */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Admin Identification (Email)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-5 py-4 text-sm text-white placeholder-gray-500 transition-all focus:border-cyan-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                  required
                />
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  placeholder="Security Passphrase"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-11 pr-5 py-4 text-sm text-white placeholder-gray-500 transition-all focus:border-purple-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                  required
                />
              </div>
            </div>

            {/* Advanced Configuration Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>System Feature Overrides</span>
                </div>
                <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[11px] uppercase tracking-wider text-orange-400 font-bold">
                            API Configuration Payload
                          </p>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            Injecting a system-level API key here will forcibly bypass generative restrictions across the entire dashboard environment. 
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative group pt-2">
                        <div className="absolute inset-y-0 left-0 pt-2 pl-3 flex items-center pointer-events-none text-gray-500">
                          <Key className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          placeholder="sk-..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="w-full rounded-lg border border-orange-500/30 bg-black/60 pl-9 pr-3 py-2.5 text-xs text-orange-200 placeholder-gray-600 transition-all focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 font-mono"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="relative mt-4 w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 p-[1px] shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-50 blur-lg transition-opacity hover:opacity-100" />
              <div className="relative flex items-center justify-center gap-2 rounded-[11px] bg-black/20 px-5 py-4 text-sm font-semibold text-white backdrop-blur-md">
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Initializing Subsystems...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Authorize Access
                  </>
                )}
              </div>
            </motion.button>
          </form>

        </div>
      </motion.main>
    </div>
  );
}
