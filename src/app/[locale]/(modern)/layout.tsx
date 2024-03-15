import { ThemeProvider } from "@/components/providers"
import Navigation from "@/components/navigation"
import { getMessages } from "next-intl/server"
import { currentUser } from "@clerk/nextjs"
import { headers } from "next/headers"

type DefaultLayoutProps = Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>

export default async function DefaultLayout({
  children,
  params,
}: DefaultLayoutProps) {
  const user = await currentUser()

  // Using internationalization in Client Components
  const messages = await getMessages()
  const headersList = headers()
  const url = headersList.get("Referer") || ""

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      url={url}
      enableSystem
      disableTransitionOnChange
      locale={params.locale}
      messages={messages}
      user={
        user
          ? { id: user.id, imageUrl: user.imageUrl, username: user.username }
          : null
      }
    >
      <div
        id="root"
        className="max-w-screen relative flex size-full min-h-screen flex-col"
      >
        <Navigation />
        <div
          id="contents"
          className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center"
        >
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}

// export const runtime = 'edge';
