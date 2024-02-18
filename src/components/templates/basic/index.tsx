import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkProps } from "@/types/bookmark.type"

export default function BookmarkTemplate(
  props: Omit<BookmarkProps, "page" | "users" | "comments">
) {
  return (
    <div className="pb-20">
      {/* {props.post.icon && "emoji" in props.post.icon
                ? props.post.icon.emoji
                : "Grid"} */}
      <Tabs defaultValue="Anycons" className="mb-10 text-center">
        <TabsList className="sticky top-16 z-10 mx-auto mb-10">
          <TabsTrigger value="Anycons">애니콘</TabsTrigger>
          <TabsTrigger value="HomeScreen">홈스크린</TabsTrigger>
          <TabsTrigger value="Misc">기타 기능</TabsTrigger>
        </TabsList>
        <TabsContent
          value="Anycons"
          className="flex flex-col space-y-5 text-left md:block md:columns-sm lg:columns-1 2xl:columns-2xs"
        >
          <div className="bg-card text-card-foreground mx-auto flex w-full flex-col space-y-2 overflow-hidden rounded-3xl shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dFAVbwH6hoY?si=wuZlnbo07Lj1cEMO&amp;start=85&amp;controls=0&amp;modestbranding=1&amp;rel=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video rounded-t-2xl lg:mx-auto"
            />
            <div className="flex flex-col space-y-6 p-6">
              <div className="flex flex-col">
                테마 작업을 간소화하는 아이콘 팩 가족으로, 모든 앱을 지원하는
                다양한 아이콘 팩이 포함되어 있습니다.
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground mx-auto flex w-full flex-col space-y-2 overflow-hidden rounded-3xl shadow-lg">
            <div className="flex flex-col space-y-6 p-6">
              <div className="flex flex-col space-y-1">
                <div className="flex-none text-3xl font-black">
                  아이콘 보조 기능
                </div>
                <div className="flex flex-1 flex-col">
                  아이콘 팩을 변경할 때 개별적으로 설정한 아이콘을 자동으로
                  저장하고 복원합니다.
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="HomeScreen"
          className="flex flex-col space-y-5 text-left md:block md:columns-sm lg:columns-1 2xl:columns-2xs"
        >
          <div className="bg-primary text-primary-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              통합 캘린더 및 날씨 위젯
            </div>
            <div className="flex flex-1 flex-col">
              일정과 날씨를 한눈에 볼 수 있게 해줍니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">위젯 스택</div>
            <div className="flex flex-1 flex-col">
              홈스크린의 공간을 절약하면서 여러 위젯을 추가할 수 있습니다. 위젯
              스택을 팝업이나 팝업 폴더에 숨겨 놓고 필요할 때 쉽게 접근할 수
              있습니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              팝업으로 홈스크린 정리
            </div>
            <div className="flex flex-1 flex-col">
              앱, 단축키, 알림, 위젯을 포함할 수 있는 폴더의 더 다양한
              버전입니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">Niagara Dots</div>
            <div className="flex flex-1 flex-col">
              모든 앱을 지원하는 최소한의 아이콘 팩으로, 화려한 앱 아이콘에 의한
              주의 산만을 줄여줍니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              사용자 정의 글꼴
            </div>
            <div className="flex flex-1 flex-col">
              텍스트의 외관을 사용자화할 수 있습니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              Sesame 통합 검색
            </div>
            <div className="flex flex-1 flex-col">
              Sesame 앱과의 깊은 통합으로, 강력한 검색 기능을 제공합니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              플러그 앤 플레이
            </div>
            <div className="flex flex-1 flex-col">
              헤드폰이나 스피커를 연결할 때 음악 앱이 자동으로 나타납니다
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="Misc"
          className="flex flex-col space-y-5 text-left md:block md:columns-sm lg:columns-1 2xl:columns-2xs"
        >
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              더블 탭으로 화면 끄기
            </div>
            <div className="flex flex-1 flex-col">
              알파벳에 더블 탭하여 화면을 끕니다.
            </div>
          </div>
          <div className="bg-card text-card-foreground flex w-full flex-col space-y-2 overflow-hidden rounded-3xl p-6 shadow-lg">
            <div className="flex-none text-3xl font-black">
              스테이터스 바 숨기기
            </div>
            <div className="flex flex-1 flex-col">
              더 깔끔한 홈스크린을 위해 스테이터스 바를 숨길 수 있습니다.
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {props.content && (
        <div
          className="prose dark:prose-invert prose-p:text-secondary-foreground prose-headings:text-foreground mx-auto max-w-3xl text-lg/7"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      )}
    </div>
  )
}
