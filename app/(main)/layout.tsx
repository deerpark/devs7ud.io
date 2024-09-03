import {
  MainBanner,
  MainFooter,
  MainGrid,
  MainHeader,
} from "@/components/main";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex w-full max-w-5xl flex-1 flex-col justify-center sm:flex-row">
        <MainHeader />
        <div className="flex flex-1 flex-col px-6 py-10 lg:px-8">
          {children}
        </div>
      </div>
      <MainFooter />
    </>
  );
}
