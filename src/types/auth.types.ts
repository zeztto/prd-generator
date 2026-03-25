export enum UserRole {
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  profileImage?: string;
  jobTitle?: string;
  experience?: string;
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface OnboardingData {
  termsAgreed: boolean;
  privacyAgreed: boolean;
  marketingAgreed?: boolean;
  jobTitle?: string;
  experience?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export type SocialProvider = 'google' | 'github';
