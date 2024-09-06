import { MainFooter, MainHeader } from "@/components/main";
import MainAside from "@/components/main/aside/main-aside";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col items-center bg-background"
      vaul-drawer-wrapper="true"
    >
      <div className="flex w-full max-w-5xl flex-1 flex-col justify-center md:flex-row">
        <MainHeader slug="/" />
        <div className="flex flex-1 flex-col gap-y-5 px-0 pb-3 md:gap-y-3 md:px-8 md:py-9">
          {children}
        </div>
        <MainAside />
      </div>
      <MainFooter />
    </div>
  );
}
