import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'SUPER_ADMIN' | 'CANDIDATE' | 'RECRUITER' | 'COLLEGE';

interface AdminState {
  // Core state
  activeRole: UserRole;
  isGodMode: boolean; // Bypasses all feature locks and subscriptions

  // Actions
  setActiveRole: (role: UserRole) => void;
  enableGodMode: () => void;
  disableGodMode: () => void;
  resetToAdmin: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      activeRole: 'SUPER_ADMIN',
      // We start this false by default, but login logic will set it to true for the owner
      isGodMode: false,

      setActiveRole: (role) => set({ activeRole: role }),
      enableGodMode: () => set({ isGodMode: true, activeRole: 'SUPER_ADMIN' }),
      disableGodMode: () => set({ isGodMode: false }),
      resetToAdmin: () => set({ activeRole: 'SUPER_ADMIN' }),
    }),
    {
      name: 'resume-ai-admin-storage',
    }
  )
);
