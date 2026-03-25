"use client";

import { useAuthStore } from "@/stores/auth.store";
import { User, Bell, Shield, Palette, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const settingSections = [
  {
    icon: Bell,
    title: "알림 설정",
    description: "이메일 및 푸시 알림 설정",
  },
  {
    icon: Shield,
    title: "보안",
    description: "비밀번호 변경 및 2단계 인증",
  },
  {
    icon: Palette,
    title: "테마",
    description: "라이트/다크 모드 설정",
  },
  {
    icon: Globe,
    title: "언어",
    description: "인터페이스 언어 설정",
  },
];

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          계정 및 앱 설정을 관리하세요
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-8">
        {/* 프로필 섹션 */}
        <div className="rounded-xl border bg-card p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10">
              <User className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h2 className="font-semibold tracking-tight">프로필</h2>
              <p className="text-xs text-muted-foreground">기본 프로필 정보</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-name">이름</Label>
              <Input
                id="settings-name"
                defaultValue={user?.name || ""}
                placeholder="이름"
                className="h-10 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-email">이메일</Label>
              <Input
                id="settings-email"
                defaultValue={user?.email || ""}
                placeholder="이메일"
                className="h-10 rounded-lg"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                이메일은 변경할 수 없습니다
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-role">직무</Label>
              <Input
                id="settings-role"
                defaultValue={user?.role || ""}
                placeholder="예: Product Manager"
                className="h-10 rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                disabled
              >
                저장 (준비 중)
              </Button>
            </div>
          </div>
        </div>

        {/* 기타 설정 섹션들 */}
        <div className="grid gap-4 sm:grid-cols-2">
          {settingSections.map((section) => (
            <div
              key={section.title}
              className="flex items-start gap-3 rounded-xl border bg-card p-5 transition-all hover:border-brand/30 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <section.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight">
                  {section.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {section.description}
                </p>
                <span className="mt-1.5 inline-block text-xs text-muted-foreground/60">
                  곧 출시 예정
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 로그아웃 */}
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold tracking-tight text-destructive">
                로그아웃
              </h3>
              <p className="text-sm text-muted-foreground">
                현재 세션에서 로그아웃합니다
              </p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-1.5 h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
