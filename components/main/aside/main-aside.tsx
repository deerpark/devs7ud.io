import { Button } from "@/components/ui/button";
import { mainCategoryConfig } from "@/config/main";
import { categoryIcons } from "@/config/main/main-category-config";
import Link from "next/link";

export default function MainAside() {
  return (
    <div className="w-full max-w-full flex-none sm:w-auto sm:max-w-sm">
      <div className="flex w-72 flex-col gap-y-4 py-9 pl-2 pr-6">
        <div className="flex items-center gap-x-2">
          <h2 className="px-3 text-xl font-black">인기글</h2>
        </div>
        <ul className="flex flex-col gap-y-2">
          <li>
            <Link href="/" className="flex items-center gap-x-3 px-3">
              <div className="size-14 rounded-xl bg-accent"></div>
              <span className="flex flex-1 flex-col">
                <span className="flex items-center gap-x-1 text-foreground/50">
                  <categoryIcons.news className="h-4 w-4" strokeWidth={2} />
                  <span className="text-xs/4 font-semibold">작업</span>
                </span>
                <span className="flex items-center gap-x-3">
                  <span className="line-clamp-1 flex-1 text-sm font-bold">
                    종합 편성표 대시보드
                  </span>
                </span>
                <span className="line-clamp-1 text-xs/4 text-foreground/80">
                  채널별 편성표를 한번에 모아볼수 있도록 제작 하였습니다.
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
