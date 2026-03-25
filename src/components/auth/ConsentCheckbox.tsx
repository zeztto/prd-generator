"use client";

import { useCallback, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface ConsentState {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface ConsentCheckboxProps {
  consent: ConsentState;
  onChange: (consent: ConsentState) => void;
}

const requiredItems = [
  { key: "terms" as const, label: "서비스 이용약관 동의", required: true },
  { key: "privacy" as const, label: "개인정보 처리방침 동의", required: true },
];

const optionalItems = [
  { key: "marketing" as const, label: "마케팅 수신 동의", required: false },
];

const allItems = [...requiredItems, ...optionalItems];

export default function ConsentCheckbox({
  consent,
  onChange,
}: ConsentCheckboxProps) {
  const allChecked = useMemo(
    () => allItems.every((item) => consent[item.key]),
    [consent],
  );

  const handleAllChange = useCallback(
    (checked: boolean) => {
      onChange({
        terms: checked,
        privacy: checked,
        marketing: checked,
      });
    },
    [onChange],
  );

  const handleItemChange = useCallback(
    (key: keyof ConsentState, checked: boolean) => {
      onChange({ ...consent, [key]: checked });
    },
    [consent, onChange],
  );

  return (
    <div className="flex flex-col gap-3">
      {/* 전체 동의 */}
      <div className="flex items-center gap-2 rounded-md border bg-muted/40 p-3">
        <Checkbox
          id="consent-all"
          checked={allChecked}
          onCheckedChange={(checked) => handleAllChange(!!checked)}
        />
        <Label
          htmlFor="consent-all"
          className="cursor-pointer text-sm font-semibold"
        >
          전체 동의
        </Label>
      </div>

      {/* 개별 항목 */}
      <div className="flex flex-col gap-2 pl-2">
        {allItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`consent-${item.key}`}
                checked={consent[item.key]}
                onCheckedChange={(checked) =>
                  handleItemChange(item.key, !!checked)
                }
              />
              <Label
                htmlFor={`consent-${item.key}`}
                className="cursor-pointer text-sm"
              >
                {item.label}
                {item.required ? (
                  <span className="ml-1 text-destructive">(필수)</span>
                ) : (
                  <span className="ml-1 text-muted-foreground">(선택)</span>
                )}
              </Label>
            </div>
            {item.required && (
              <a
                href="#"
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                보기
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
