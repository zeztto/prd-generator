"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

interface Rule {
  label: string;
  test: (pw: string) => boolean;
}

const rules: Rule[] = [
  { label: "8자 이상", test: (pw) => pw.length >= 8 },
  { label: "영문 포함", test: (pw) => /[a-zA-Z]/.test(pw) },
  { label: "숫자 포함", test: (pw) => /[0-9]/.test(pw) },
  { label: "특수문자 포함", test: (pw) => /[^a-zA-Z0-9]/.test(pw) },
];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const passed = useMemo(
    () => rules.filter((r) => r.test(password)).length,
    [password],
  );

  const { color, label } = useMemo(() => {
    if (passed <= 1) return { color: "bg-destructive", label: "약함" };
    if (passed <= 3) return { color: "bg-yellow-500", label: "보통" };
    return { color: "bg-green-500", label: "강함" };
  }, [passed]);

  if (!password) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* 프로그레스 바 */}
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", color)}
            style={{ width: `${(passed / 4) * 100}%` }}
          />
        </div>
        <span
          className={cn(
            "text-xs font-medium",
            passed <= 1 && "text-destructive",
            passed >= 2 && passed <= 3 && "text-yellow-600",
            passed === 4 && "text-green-600",
          )}
        >
          {label}
        </span>
      </div>

      {/* 규칙 목록 */}
      <ul className="flex flex-col gap-1">
        {rules.map((rule) => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-1.5 text-xs",
                ok ? "text-green-600" : "text-muted-foreground",
              )}
            >
              {ok ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
