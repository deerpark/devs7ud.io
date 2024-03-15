export default function IosSearchPage() {
  return (
    <div className="bg-card relative flex min-h-[calc(100vh-112px)] w-full flex-1 flex-col space-y-4 py-4">
      <div className="flex h-14 flex-none items-center px-5 font-bold">
        <div className="flex flex-none items-center space-x-2">
          <div className="">09:58</div>
        </div>
        <div className="flex-1"></div>
        <div className="rounded-5xl flex h-12 max-w-fit flex-none items-center overflow-hidden bg-black px-2 py-1">
          <div className="h-10 w-40 flex-none"></div>
        </div>
        <div className="flex-1"></div>
        <div className="flex-none">
          <div className="">61%</div>
        </div>
      </div>
      <div className="bg-background/80 absolute bottom-36 left-1/2 z-20 flex max-h-fit max-w-fit -translate-x-1/2 items-center space-x-2 rounded-3xl px-2 py-1 backdrop-blur-sm">
        <span className="text-sm/tight">검색</span>
      </div>
      <div className="relative z-10 flex flex-1 flex-col space-y-24 px-5">
        <div className="flex-1"></div>
        <div className="flex-none">
          <div className="bg-background/80 flex items-center justify-center space-x-8 rounded-3xl p-5 backdrop-blur-sm">
            <div className="size-16 rounded-xl bg-green-600"></div>
            <div className="size-16 rounded-xl bg-orange-600"></div>
            <div className="size-16 rounded-xl bg-yellow-600"></div>
            <div className="size-16 rounded-xl bg-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
