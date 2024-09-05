import Link from "next/link";

export default function MainAside() {
  return (
    <div className="w-auto flex-none md:hidden lg:block lg:max-w-sm">
      <div className="flex flex-col gap-y-6 py-9 pl-2 pr-6 md:w-72 lg:sticky lg:top-0 lg:z-50">
        <div className="flex items-center gap-x-2">
          <h2 className="px-3 text-xl font-black">인기글</h2>
        </div>
        <ul className="flex flex-col gap-y-2 pl-3 pt-0.5">
          <li>
            <Link
              href="/"
              className="flex items-center gap-x-3 rounded-xl pr-3 hover:bg-accent/30 active:bg-accent/50"
            >
              <div className="size-14 rounded-xl bg-accent"></div>
              <span className="flex flex-1 flex-col">
                <span className="flex items-center gap-x-3">
                  <span className="line-clamp-1 flex-1 font-bold">
                    종합 편성표 대시보드
                  </span>
                </span>
                <span className="line-clamp-1 text-sm/4 text-foreground/80">
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
