import { MainFooter, MainHeader } from "@/components/main";
import MainAside from "@/components/main/aside/main-aside";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col items-center bg-background"
      vaul-drawer-wrapper="true"
    >
      <div className="flex w-full max-w-5xl flex-1 flex-col justify-center sm:flex-row">
        <MainHeader />
        <div className="flex flex-1 flex-col px-6 py-9 lg:px-8">{children}</div>
        <MainAside />
      </div>
      <MainFooter />
    </div>
  );
}
