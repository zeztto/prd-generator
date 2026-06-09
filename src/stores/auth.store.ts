import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { authService } from '@/lib/services/auth.service';
import type { LoginData, OnboardingData, SignupData, SocialProvider, User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;
  error: string | null;
  hasHydrated: boolean;
  isBootstrapping: boolean;
}

interface AuthActions {
  login: (data: LoginData) => Promise<User>;
  loginWithSocial: (provider: SocialProvider) => Promise<User>;
  signup: (data: SignupData) => Promise<User>;
  logout: () => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<User>;
  refreshSession: () => Promise<User | null>;
  setUser: (user: User | null) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isOnboarded: false,
  error: null,
  hasHydrated: false,
  isBootstrapping: true,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(data);
          set({
            user: response.user,
            isAuthenticated: true,
            isOnboarded: response.user.isOnboarded,
            isLoading: false,
            isBootstrapping: false,
          });
          return response.user;
        } catch (err) {
          const message = err instanceof Error ? err.message : '로그인에 실패했습니다.';
          set({
            isLoading: false,
            error: message,
            isBootstrapping: false,
          });
          throw err instanceof Error ? err : new Error(message);
        }
      },

      loginWithSocial: async (provider: SocialProvider) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.loginWithSocial(provider);
          set({
            user: response.user,
            isAuthenticated: true,
            isOnboarded: response.user.isOnboarded,
            isLoading: false,
            isBootstrapping: false,
          });
          return response.user;
        } catch (err) {
          const message = err instanceof Error ? err.message : '소셜 로그인에 실패했습니다.';
          set({
            isLoading: false,
            error: message,
            isBootstrapping: false,
          });
          throw err instanceof Error ? err : new Error(message);
        }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.signup(data);
          set({
            user: response.user,
            isAuthenticated: true,
            isOnboarded: response.user.isOnboarded,
            isLoading: false,
            isBootstrapping: false,
          });
          return response.user;
        } catch (err) {
          const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
          set({
            isLoading: false,
            error: message,
            isBootstrapping: false,
          });
          throw err instanceof Error ? err : new Error(message);
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.logout();
        } finally {
          set({
            ...initialState,
            hasHydrated: true,
            isBootstrapping: false,
          });
        }
      },

      completeOnboarding: async (data: OnboardingData) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.completeOnboarding(data);
          set({
            user,
            isOnboarded: true,
            isAuthenticated: true,
            isLoading: false,
            isBootstrapping: false,
          });
          return user;
        } catch (err) {
          const message = err instanceof Error ? err.message : '온보딩 처리에 실패했습니다.';
          set({
            isLoading: false,
            error: message,
            isBootstrapping: false,
          });
          throw err instanceof Error ? err : new Error(message);
        }
      },

      refreshSession: async () => {
        set({ isBootstrapping: true, error: null });
        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: Boolean(user),
            isOnboarded: user?.isOnboarded ?? false,
            isBootstrapping: false,
          });
          return user;
        } catch (err) {
          set({
            user: null,
            isAuthenticated: false,
            isOnboarded: false,
            error: err instanceof Error ? err.message : '세션을 확인할 수 없습니다.',
            isBootstrapping: false,
          });
          return null;
        }
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: Boolean(user),
          isOnboarded: user?.isOnboarded ?? false,
        });
      },

      setHasHydrated: (hasHydrated: boolean) => {
        set({ hasHydrated });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'prd-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isOnboarded: state.isOnboarded,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
