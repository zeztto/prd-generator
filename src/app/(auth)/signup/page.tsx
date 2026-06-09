"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import SignupForm from "@/components/auth/SignupForm";
import { useAuthStore } from "@/stores/auth.store";

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const loginWithSocial = useAuthStore((s) => s.loginWithSocial);

  const routeAfterAuth = (isOnboarded: boolean) => {
    router.push(isOnboarded ? "/dashboard" : "/onboarding");
  };

  const handleSocialLogin = async (
    provider: "google" | "github" | "kakao",
  ) => {
    if (provider === "kakao") {
      window.alert("카카오 로그인은 아직 지원하지 않습니다.");
      return;
    }

    try {
      const user = await loginWithSocial(provider);
      routeAfterAuth(user.isOnboarded);
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "소셜 로그인에 실패했습니다.",
      );
    }
  };

  const handleSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const user = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      });
      routeAfterAuth(user.isOnboarded);
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          무료로 시작하세요
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          계정을 만들고 PRD 작성을 시작하세요
        </p>
      </div>

      <SocialLoginButtons onSocialLogin={handleSocialLogin} />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">
          또는 이메일로 가입
        </span>
        <Separator className="flex-1" />
      </div>

      <SignupForm onSubmit={handleSubmit} />

      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
