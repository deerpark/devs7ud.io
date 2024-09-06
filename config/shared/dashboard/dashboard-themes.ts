import { DashBoardType } from "@/types";
import { MonitorSmartphone, MoonStar, Palette, Sun } from "lucide-react";

const dashBoardThemes: DashBoardType = {
  title: "테마",
  slug: "/themes",
  icon: Palette,
  subMenu: [
    {
      title: "라이트 모드",
      slug: "light",
      icon: Sun,
    },
    {
      title: "다크 모드",
      slug: "dark",
      icon: MoonStar,
    },
    {
      title: "시스템 모드",
      slug: "system",
      icon: MonitorSmartphone,
    },
  ],
};

export default dashBoardThemes;
