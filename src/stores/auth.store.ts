import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { LoginData, OnboardingData, SignupData, SocialProvider, User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;
  error: string | null;
}

interface AuthActions {
  login: (data: LoginData) => Promise<void>;
  loginWithSocial: (provider: SocialProvider) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isOnboarded: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          // Mock 구현을 서비스 레이어에서 호출
          const { mockAuthService } = await import('@/lib/mock/services/auth.service');
          const response = await mockAuthService.login(data);
          set({
            user: response.user,
            isAuthenticated: true,
            isOnboarded: response.user.isOnboarded,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : '로그인에 실패했습니다.',
          });
        }
      },

      loginWithSocial: async (provider: SocialProvider) => {
        set({ isLoading: true, error: null });
        try {
          const { mockAuthService } = await import('@/lib/mock/services/auth.service');
          const response = await mockAuthService.loginWithSocial(provider);
          set({
            user: response.user,
            isAuthenticated: true,
            isOnboarded: response.user.isOnboarded,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : '소셜 로그인에 실패했습니다.',
          });
        }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });
        try {
          const { mockAuthService } = await import('@/lib/mock/services/auth.service');
          const response = await mockAuthService.signup(data);
          set({
            user: response.user,
            isAuthenticated: true,
            isOnboarded: false,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : '회원가입에 실패했습니다.',
          });
        }
      },

      logout: () => {
        set(initialState);
      },

      completeOnboarding: async (data: OnboardingData) => {
        set({ isLoading: true, error: null });
        try {
          const { mockAuthService } = await import('@/lib/mock/services/auth.service');
          const user = await mockAuthService.completeOnboarding(data);
          set({
            user,
            isOnboarded: true,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : '온보딩 처리에 실패했습니다.',
          });
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true, isOnboarded: user.isOnboarded });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
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
    },
  ),
);
