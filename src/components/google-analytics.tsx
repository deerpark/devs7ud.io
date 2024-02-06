import Script from "next/script"
import { env } from "@/lib/env"

const GoogleAnalytics = () =>
  env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
      id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `,
        }}
      ></Script>
    </>
  ) : null

export default GoogleAnalytics
