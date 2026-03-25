import type {
  AuthResponse,
  LoginData,
  OnboardingData,
  SignupData,
  SocialProvider,
  User,
} from '@/types/auth.types';
import { UserRole, UserStatus } from '@/types/auth.types';
import type { AuthService } from '@/types/api.types';
import { MOCK_USER } from '@/lib/mock/data/users';
import { mockDelay } from '@/lib/mock/delay';

function generateToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const mockAuthServiceImpl: AuthService = {
  async login(data: LoginData): Promise<AuthResponse> {
    await mockDelay(500);

    // Mock: 어떤 이메일/비밀번호로든 로그인 성공
    const user: User = {
      ...MOCK_USER,
      email: data.email,
    };

    return {
      user,
      accessToken: generateToken(),
      refreshToken: generateToken(),
    };
  },

  async loginWithSocial(provider: SocialProvider): Promise<AuthResponse> {
    await mockDelay(800);

    const user: User = {
      ...MOCK_USER,
      email: `${provider}@example.com`,
    };

    return {
      user,
      accessToken: generateToken(),
      refreshToken: generateToken(),
    };
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    await mockDelay(700);

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      isOnboarded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      user: newUser,
      accessToken: generateToken(),
      refreshToken: generateToken(),
    };
  },

  async logout(): Promise<void> {
    await mockDelay(200);
  },

  async completeOnboarding(data: OnboardingData): Promise<User> {
    await mockDelay(500);

    return {
      ...MOCK_USER,
      isOnboarded: true,
      jobTitle: data.jobTitle,
      experience: data.experience,
      updatedAt: new Date().toISOString(),
    };
  },

  async getCurrentUser(): Promise<User> {
    await mockDelay(300);
    return MOCK_USER;
  },
};

export const mockAuthService = mockAuthServiceImpl;
