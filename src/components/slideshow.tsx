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
import Image from "next/image"
import * as React from "react"

type SlideshowProps = {
  items: Screenshot[]
}

export default function Slideshow({ items = [] }: SlideshowProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

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
    <div className="mx-auto max-w-3xl">
      <Carousel setApi={setApi} className="w-full max-w-full">
        <CarouselContent>
          {items
            .filter((item) => item.file.url)
            .map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        alt="Image"
                        src={item.file.url}
                        // width={banner.width}
                        width={720}
                        height={400}
                        className="w-full max-w-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3" />
        <CarouselNext className="-right-3" />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  ) : null
}
