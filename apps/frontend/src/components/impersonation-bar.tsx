"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ImpersonationBar() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // In a real implementation, we would decode the JWT to get the active role.
    // For now, we mock the role checking logic locally.
    const token = localStorage.getItem("token");
    if (token) {
      setRole(localStorage.getItem("viewAsRole") || "ADMIN");
    }
  }, []);

  if (!role) return null;

  const handleRoleChange = (newRole: string) => {
    localStorage.setItem("viewAsRole", newRole);
    setRole(newRole);
    // Force reload to apply new view-as state across the app
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("viewAsRole");
    router.push("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-12 w-full items-center justify-between border-b border-cyan-500/20 bg-black/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Owner Mode Active
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span className="text-gray-500">View As:</span>
          <select
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="cursor-pointer appearance-none rounded-md border border-white/10 bg-white/5 py-1 pl-3 pr-8 text-sm font-medium text-white hover:bg-white/10 focus:border-cyan-500 focus:outline-none"
          >
            <option value="ADMIN" className="bg-black text-white">Admin</option>
            <option value="RECRUITER" className="bg-black text-white">Recruiter</option>
            <option value="CANDIDATE" className="bg-black text-white">Candidate</option>
          </select>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-400 transition-colors hover:text-red-300"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
