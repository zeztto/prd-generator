'use client';

import { useCallback } from 'react';

import { useAuthStore } from '@/stores/auth.store';
import type { LoginData, OnboardingData, SignupData, SocialProvider } from '@/types/auth.types';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isOnboarded = useAuthStore((s) => s.isOnboarded);
  const error = useAuthStore((s) => s.error);

  const loginAction = useAuthStore((s) => s.login);
  const loginWithSocialAction = useAuthStore((s) => s.loginWithSocial);
  const signupAction = useAuthStore((s) => s.signup);
  const logoutAction = useAuthStore((s) => s.logout);
  const completeOnboardingAction = useAuthStore((s) => s.completeOnboarding);
  const clearErrorAction = useAuthStore((s) => s.clearError);

  const login = useCallback(
    (data: LoginData) => loginAction(data),
    [loginAction],
  );

  const loginWithSocial = useCallback(
    (provider: SocialProvider) => loginWithSocialAction(provider),
    [loginWithSocialAction],
  );

  const signup = useCallback(
    (data: SignupData) => signupAction(data),
    [signupAction],
  );

  const logout = useCallback(() => logoutAction(), [logoutAction]);

  const completeOnboarding = useCallback(
    (data: OnboardingData) => completeOnboardingAction(data),
    [completeOnboardingAction],
  );

  const clearError = useCallback(() => clearErrorAction(), [clearErrorAction]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isOnboarded,
    error,
    login,
    loginWithSocial,
    signup,
    logout,
    completeOnboarding,
    clearError,
  };
}
