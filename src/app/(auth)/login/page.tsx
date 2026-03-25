"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const loginWithSocial = useAuthStore((s) => s.loginWithSocial);

  const handleSocialLogin = async (
    provider: "google" | "github" | "kakao",
  ) => {
    if (provider === "kakao") {
      console.log("Kakao login not yet supported");
      return;
    }
    await loginWithSocial(provider);
    router.push("/dashboard");
  };

  const handleSubmit = async (data: { email: string; password: string }) => {
    await login(data);
    router.push("/dashboard");
  };

  const handleTestLogin = async () => {
    await login({ email: "test@prd.ai", password: "Test1234!" });
    // 온보딩 스킵
    useAuthStore.setState({ isOnboarded: true });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          다시 오신 것을 환영해요
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          계정에 로그인하세요
        </p>
      </div>

      <SocialLoginButtons onSocialLogin={handleSocialLogin} />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">
          또는 이메일로 로그인
        </span>
        <Separator className="flex-1" />
      </div>

      <LoginForm onSubmit={handleSubmit} />

      {/* 테스트 로그인 버튼 */}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">빠른 시작</span>
        <Separator className="flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 border-brand/30 text-brand hover:bg-brand/5 hover:text-brand"
        onClick={handleTestLogin}
      >
        <Zap className="h-4 w-4" />
        테스트 계정으로 바로 시작
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
