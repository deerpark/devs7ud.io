"use client"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Screenshot } from "@/types/bookmark.type"
import { Card, CardContent } from "./ui/card"
import { useTranslations } from "next-intl"
import Image from "next/image"
import * as React from "react"

type SlideshowProps = {
  items: Screenshot[]
  label?: string
}

export default function Slideshow({ items = [], label }: SlideshowProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const t = useTranslations()

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      console.log("current")
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return items.length ? (
    <div className="mx-auto max-w-3xl rounded-3xl">
      <Carousel setApi={setApi} className="w-full max-w-full rounded-3xl">
        <CarouselContent>
          {items
            .filter((item) => item.file.url)
            .map((item, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden rounded-3xl border-0">
                  <CardContent className="flex aspect-square items-center justify-center rounded-3xl p-0 lg:aspect-video">
                    <Image
                      alt="Image"
                      src={item.file.url}
                      // width={banner.width}
                      width={720}
                      height={400}
                      sizes="(max-width: 720px) 100vw"
                      className="via-primary/30 to-primary/50 size-full max-w-full rounded-3xl bg-gradient-to-b object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
          variant="secondary"
          className="bg-primary/75 border-background ease-expo-in-out group left-5 size-9 backdrop-blur-sm transition-all duration-500"
        />
        <CarouselNext
          variant="secondary"
          className="bg-primary/75 border-background ease-expo-in-out group right-5 size-9 backdrop-blur-sm transition-all duration-500"
        />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        {label || t("SLIDESHOW.indicator", { current, count })}
      </div>
    </div>
  ) : null
}
