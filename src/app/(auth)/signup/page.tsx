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

  const handleSocialLogin = async (
    provider: "google" | "github" | "kakao",
  ) => {
    if (provider === "kakao") {
      // TODO: 카카오 소셜 로그인 구현
      console.log("Kakao login not yet supported");
      return;
    }
    await loginWithSocial(provider);
    router.push("/onboarding");
  };

  const handleSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    await signup({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
    });
    router.push("/onboarding");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">회원가입</h1>
      </div>

      <SocialLoginButtons onSocialLogin={handleSocialLogin} />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">또는</span>
        <Separator className="flex-1" />
      </div>

      <SignupForm onSubmit={handleSubmit} />

      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
