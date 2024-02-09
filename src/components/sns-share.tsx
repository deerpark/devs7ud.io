"use client"

import {
  FacebookShareButton,
  EmailShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WeiboShareButton,
  WhatsappShareButton,
} from "next-share"
import {
  FaFacebookFIcon,
  FaGetPocketIcon,
  FaLineIcon,
  FaLinkedinInIcon,
  FaPinterestPIcon,
  FaRedditAlienIcon,
  FaTelegramIcon,
  FaTumblrIcon,
  FaTwitterIcon,
  FaViberIcon,
  FaVkIcon,
  FaWeiboIcon,
  FaWhatsappIcon,
} from "./icon-brand"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { FaArrowUpFromBracketIcon } from "./icon-duotone"
import { useTranslations } from "next-intl"
import { FaMailbox } from "./icon-regular"
import { appConfig } from "@/config/app"
import { Button } from "./ui/button"

export default function SnsShare() {
  const t = useTranslations()
  const url =
    (typeof window !== "undefined" && window.location.href) || appConfig.url
  const title =
    (typeof document !== "undefined" && document.title) || appConfig.name
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-8" variant="ghost" size="icon">
                <FaArrowUpFromBracketIcon className="size-4" />
                <span className="sr-only">{t("TITLEBAR.share")}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("TITLEBAR.share")}</TooltipContent>
          </Tooltip>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="font-bold">{t("SHARE.title")}</DrawerTitle>
            <DrawerDescription>{t("SHARE.description")}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-6">
              <EmailShareButton url={url} subject={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaMailbox className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Email</TooltipContent>
                </Tooltip>
              </EmailShareButton>
              <FacebookShareButton
                url={url}
                quote={title}
                hashtag={"#devs7udio"}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaFacebookFIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Facebook</TooltipContent>
                </Tooltip>
              </FacebookShareButton>
              <LineShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaLineIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Line</TooltipContent>
                </Tooltip>
              </LineShareButton>
              <LinkedinShareButton url={url}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaLinkedinInIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
              </LinkedinShareButton>
              <PinterestShareButton url={url} media={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaPinterestPIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Pinterest</TooltipContent>
                </Tooltip>
              </PinterestShareButton>
              <PocketShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaGetPocketIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Pocket</TooltipContent>
                </Tooltip>
              </PocketShareButton>
              <RedditShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaRedditAlienIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reddit</TooltipContent>
                </Tooltip>
              </RedditShareButton>
              <TelegramShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaTelegramIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Telegram</TooltipContent>
                </Tooltip>
              </TelegramShareButton>
              <TumblrShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaTumblrIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Tumblr</TooltipContent>
                </Tooltip>
              </TumblrShareButton>
              <TwitterShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaTwitterIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Twitter</TooltipContent>
                </Tooltip>
              </TwitterShareButton>
              <ViberShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaViberIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Viber</TooltipContent>
                </Tooltip>
              </ViberShareButton>
              <VKShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaVkIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>VK</TooltipContent>
                </Tooltip>
              </VKShareButton>
              <WeiboShareButton url={url} title={title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaWeiboIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Weibo</TooltipContent>
                </Tooltip>
              </WeiboShareButton>
              <WhatsappShareButton url={url} title={title} separator=":: ">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <FaWhatsappIcon className="size-5" />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Wahtsapp</TooltipContent>
                </Tooltip>
              </WhatsappShareButton>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>{t("confirm")}</Button>
            </DrawerClose>
            {/* <DrawerClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
