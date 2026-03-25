"use client";

import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordStrength from "./PasswordStrength";

const signupSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.email("올바른 이메일 주소를 입력해주세요"),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  const handleFormSubmit = (data: SignupFormValues) => {
    onSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
    >
      {/* 이름 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="signup-name">이름</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="홍길동"
          autoComplete="name"
          className="h-11 rounded-lg"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* 이메일 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="signup-email">이메일</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          className="h-11 rounded-lg"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="signup-password">비밀번호</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="8자 이상 입력하세요"
          autoComplete="new-password"
          className="h-11 rounded-lg"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
        <PasswordStrength password={password} />
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="signup-password-confirm">비밀번호 확인</Label>
        <Input
          id="signup-password-confirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          className="h-11 rounded-lg"
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && (
          <p className="text-sm text-destructive">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {/* 가입 버튼 */}
      <Button
        type="submit"
        className="h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "가입 중..." : "가입하기"}
      </Button>
    </form>
  );
}
