"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ConsentCheckbox, { type ConsentState } from "./ConsentCheckbox";
import { cn } from "@/lib/utils";

const roles = [
  { value: "pm", label: "PM / PO" },
  { value: "developer", label: "개발자" },
  { value: "designer", label: "디자이너" },
  { value: "founder", label: "창업자" },
  { value: "other", label: "기타" },
];

const experiences = [
  { value: "junior", label: "주니어 (0-2년)" },
  { value: "mid", label: "미들 (3-5년)" },
  { value: "senior", label: "시니어 (6년+)" },
];

interface OnboardingStepsProps {
  onComplete: (data: {
    consent: ConsentState;
    role?: string;
    experience?: string;
  }) => void;
}

export default function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const [step, setStep] = useState(1);

  // Step 1: 동의
  const [consent, setConsent] = useState<ConsentState>({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // Step 2: 프로필
  const [role, setRole] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  const isConsentValid = consent.terms && consent.privacy;

  const handleNext = useCallback(() => {
    if (step === 1) {
      setStep(2);
    }
  }, [step]);

  const handleComplete = useCallback(() => {
    onComplete({
      consent,
      role: role || undefined,
      experience: experience || undefined,
    });
  }, [consent, role, experience, onComplete]);

  return (
    <div className="flex flex-col gap-6">
      {/* 스텝 인디케이터 */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              s === step
                ? "bg-primary text-primary-foreground"
                : s < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: 약관 동의 */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-base font-semibold">약관 동의</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              서비스 이용을 위해 약관에 동의해주세요
            </p>
          </div>

          <ConsentCheckbox consent={consent} onChange={setConsent} />

          <Button
            onClick={handleNext}
            disabled={!isConsentValid}
            className="w-full"
          >
            다음
          </Button>
        </div>
      )}

      {/* Step 2: 직군 & 경력 */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-base font-semibold">추가 정보</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              맞춤형 경험을 위해 알려주세요 (건너뛰기 가능)
            </p>
          </div>

          {/* 직군 */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">직군</Label>
            <RadioGroup value={role} onValueChange={setRole}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {roles.map((r) => (
                  <Label
                    key={r.value}
                    htmlFor={`role-${r.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors",
                      role === r.value
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/60",
                    )}
                  >
                    <RadioGroupItem
                      value={r.value}
                      id={`role-${r.value}`}
                    />
                    {r.label}
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* 경력 */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">경력</Label>
            <RadioGroup value={experience} onValueChange={setExperience}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {experiences.map((e) => (
                  <Label
                    key={e.value}
                    htmlFor={`exp-${e.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors",
                      experience === e.value
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/60",
                    )}
                  >
                    <RadioGroupItem
                      value={e.value}
                      id={`exp-${e.value}`}
                    />
                    {e.label}
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleComplete}
            >
              건너뛰기
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={handleComplete}
            >
              완료
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
