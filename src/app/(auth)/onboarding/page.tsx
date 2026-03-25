"use client";

import { useRouter } from "next/navigation";
import OnboardingSteps from "@/components/auth/OnboardingSteps";
import { useAuthStore } from "@/stores/auth.store";
import type { ConsentState } from "@/components/auth/ConsentCheckbox";

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const handleComplete = async (data: {
    consent: ConsentState;
    role?: string;
    experience?: string;
  }) => {
    await completeOnboarding({
      termsAgreed: data.consent.terms,
      privacyAgreed: data.consent.privacy,
      marketingAgreed: data.consent.marketing,
      jobTitle: data.role,
      experience: data.experience,
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">환영합니다! 🎉</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          시작하기 전에 몇 가지만 확인할게요
        </p>
      </div>

      <OnboardingSteps onComplete={handleComplete} />
    </div>
  );
}
