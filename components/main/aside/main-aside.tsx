import Link from "next/link";

export default function MainAside() {
  return (
    <div className="w-auto flex-none md:hidden lg:block lg:max-w-sm">
      <div className="flex flex-col gap-y-4 py-9 pl-2 pr-6 md:w-72 lg:sticky lg:top-0 lg:z-50">
        <div className="flex items-center gap-x-2">
          <h2 className="px-3 text-xl font-black">포커스</h2>
        </div>
        <ul className="flex flex-col gap-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center gap-x-3 rounded-xl p-3 hover:bg-accent/30 active:bg-accent/50"
            >
              <div className="relative aspect-[1/1.25] w-full rounded-xl bg-accent">
                <span className="absolute inset-x-0 bottom-0 flex flex-1 flex-col p-3">
                  <span className="relative z-10 flex items-center gap-x-3">
                    <span className="line-clamp-1 flex-1 text-sm font-semibold">
                      종합 편성표 대시보드
                    </span>
                  </span>
                  <span className="relative z-10 line-clamp-1 text-sm text-foreground/80">
                    채널별 편성표를 한번에 모아볼수 있도록 제작 하였습니다.
                  </span>
                  <span className="absolute inset-0 z-0 bg-background/50 p-3 blur-sm" />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
