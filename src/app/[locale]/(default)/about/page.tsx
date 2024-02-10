import GlobalMenuButton from "@/components/global-menu-button"
import { useTranslations } from "next-intl"
import { appConfig } from "@/config/app"
import Image from "next/image"
/* import Link from "next/link" */

export default function AboutPage() {
  const t = useTranslations()
  return (
    <div className="w-full flex-1 flex-col items-center justify-center lg:absolute lg:inset-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative flex min-h-screen flex-col p-4 pb-10 text-white lg:items-start dark:border-r">
        <div className="bg-secondary-foreground dark:bg-secondary group absolute inset-0">
          <Image
            src="/assets/images/me-ai-light.jpg"
            width={704}
            height={1536}
            alt="Yonn Kim"
            className="ease-expo-in-out absolute inset-0 block size-full object-cover opacity-70 transition-all duration-1000 group-hover:opacity-0 dark:opacity-30 dark:invert"
          />
          <Image
            src="/assets/images/me.jpg"
            width={704}
            height={1536}
            alt="Yonn Kim"
            className="ease-expo-in-out absolute inset-0 block size-full object-cover opacity-0 grayscale transition-all duration-1000 group-hover:opacity-70 dark:group-hover:opacity-50"
          />
        </div>
        <div className="relative z-20 flex w-full items-center pt-[calc(env(safe-area-inset-top)-8px)] text-base font-medium text-white">
          <GlobalMenuButton isMono />
          <span className="flex-1" />
          <div className="pointer-events-none flex items-center space-x-2">
            <span>GS Retail</span>
            <svg
              width="20"
              height="21"
              viewBox="0 0 81 85"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="GS_logo" fill="currentColor" fill-rule="nonzero">
                  <path
                    d="M8.777,22.377 L5.773,19.064 C2.096,25.353 0,32.646 0,40.061 L2.07,40.061 C2.08,33.125 4.492,26.815 8.777,22.377 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M8.242,54.909 C4.48,51.35 2.07,46.529 2.07,40.095 C2.07,40.085 2.07,40.071 2.07,40.061 L0,40.061 C0,47.602 1.346,54.612 4.002,60.723 L8.242,54.909 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M74.135,34.711 L70.289,38.683 C75.615,38.76 78.889,42.872 78.773,48.118 L80.8430003,48.118 C80.844,42.942 78.418,38.233 74.135,34.711 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M80.844,48.117 L78.774,48.117 C78.672,52.433 76.366,56.057 71.249,58.749 L76.651,66.188 C79.287,61.32 80.844,55.349 80.844,48.117 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M10.938,34.016 C10.79,34.813 10.708,35.637 10.708,36.492 C10.708,48.855 19.923,56.749 31.556,56.749 C53.671,56.749 60.234,38.679 70.138,38.679 C70.187,38.679 70.238,38.684 70.29,38.684 L74.136,34.712 C69.359,30.78 62.271,28.316 53.671,28.316 C36.163,28.316 26.837,42.939 18.888,42.939 C15.431,42.939 12.783,39.141 12.783,35.458 C12.783,35.075 12.808,34.703 12.847,34.343 L10.938,34.016 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M24.645,15.884 C37.426,15.884 46.297,25.552 57.7,25.552 C71.376,25.552 78.944,18.89 80.845,5.87 L78.775,5.527 C78.197,8.975 75.949,13.121 71.92,13.121 C68.119,13.121 64.088,9.782 58.221,6.56 C52.342,3.222 45.604,0 37.195,0 C23.672,0 12.262,7.968 5.773,19.063 L8.777,22.376 C12.658,18.358 18.078,15.884 24.645,15.884 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M38.004,64.001 C28.106,64.001 15.59,61.856 8.242,54.909 L4.002,60.722 C10.102,74.753 23.115,84.03 42.611,84.03 C55.498,84.03 69.756,78.926 76.65,66.188 L71.248,58.749 C64.896,62.093 54.207,64.001 38.004,64.001 Z"
                    id="Path"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 break-keep pr-5">
            <p className="text-lg">&ldquo;{t("ABOUT.message")}&rdquo;</p>
            <footer className="text-sm">{appConfig.authors[0]?.name}</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              {t("ABOUT.title")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {t("ABOUT.description")}
            </p>
          </div>
          <p className="px-8 text-center">...</p>
          <p className="text-muted-foreground px-8 text-center text-sm"></p>
        </div>
      </div>
    </div>
  )
}
