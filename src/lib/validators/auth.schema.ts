import { z } from 'zod';

// ── 로그인 스키마 ──
// Mock이므로 비밀번호 최소 1자

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ── 회원가입 스키마 ──

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    name: z
      .string()
      .min(2, '이름은 2자 이상이어야 합니다.')
      .max(30, '이름은 30자 이하여야 합니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
        '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
      ),
    confirmPassword: z
      .string()
      .min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// ── 온보딩 스키마 ──

export const onboardingSchema = z.object({
  termsAgreed: z
    .boolean()
    .refine((val) => val === true, {
      message: '이용약관에 동의해주세요.',
    }),
  privacyAgreed: z
    .boolean()
    .refine((val) => val === true, {
      message: '개인정보 처리방침에 동의해주세요.',
    }),
  marketingAgreed: z.boolean().optional(),
  jobTitle: z.string().optional(),
  experience: z.string().optional(),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
