import { apiClient } from "@/lib/services/api-client";
import type {
  LoginData,
  OnboardingData,
  SignupData,
  SocialProvider,
  User,
} from "@/types/auth.types";
import type { AuthService } from "@/types/api.types";

export const authService: AuthService = {
  async login(data: LoginData) {
    return apiClient<{ user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async loginWithSocial(provider: SocialProvider) {
    return apiClient<{ user: User }>(`/api/auth/social/${provider}`, {
      method: "POST",
    });
  },

  async signup(data: SignupData) {
    return apiClient<{ user: User }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async logout() {
    await apiClient("/api/auth/logout", {
      method: "POST",
    });
  },

  async completeOnboarding(data: OnboardingData) {
    const response = await apiClient<{ user: User }>("/api/auth/onboarding", {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    return response.user;
  },

  async getCurrentUser() {
    const response = await apiClient<{ user: User | null }>("/api/auth/session");
    return response.user;
  },
};
