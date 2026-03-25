import { UserRole, UserStatus } from '@/types/auth.types';
import type { User } from '@/types/auth.types';

export const MOCK_USER: User = {
  id: 'user-001',
  email: 'jihyun.kim@example.com',
  name: '김지현',
  role: UserRole.USER,
  status: UserStatus.ACTIVE,
  profileImage: undefined,
  jobTitle: 'Product Manager',
  experience: '5년',
  isOnboarded: true,
  createdAt: '2024-11-01T09:00:00.000Z',
  updatedAt: '2025-03-20T14:30:00.000Z',
};

export const MOCK_NEW_USER: User = {
  id: 'user-002',
  email: 'new@example.com',
  name: '신규 사용자',
  role: UserRole.USER,
  status: UserStatus.ACTIVE,
  profileImage: undefined,
  isOnboarded: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
