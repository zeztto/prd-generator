"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
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
      // TODO: 카카오 로그인 구현
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

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">로그인</h1>
      </div>

      <SocialLoginButtons onSocialLogin={handleSocialLogin} />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">또는</span>
        <Separator className="flex-1" />
      </div>

      <LoginForm onSubmit={handleSubmit} />

      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
