export const ROUTES = {
  // 랜딩
  HOME: '/',

  // 인증
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',

  // 메인
  DASHBOARD: '/dashboard',

  // PRD
  PRD_NEW: '/prd/new',
  PRD_EDIT: (id: string) => `/prd/${id}/edit` as const,
  PRD_VIEW: (id: string) => `/prd/${id}` as const,

  // 템플릿
  TEMPLATES: '/templates',

  // 설정
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
} as const;

export type StaticRoute = (typeof ROUTES)[Exclude<
  keyof typeof ROUTES,
  'PRD_EDIT' | 'PRD_VIEW'
>];
