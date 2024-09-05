"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { detailShareConfig } from "@/config/detail";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  Share,
  Twitter,
} from "lucide-react";
import * as React from "react";

interface DetailPostShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    setCopied(true);
    window.navigator.clipboard.writeText(url);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      title="Copy url to clipboard"
      onClick={copy}
    >
      {copied ? <Check className="h-8 w-8" /> : <Copy className="h-8 w-8" />}
    </Button>
  );
};

const DetailPostShareButton: React.FC<DetailPostShareButtonProps> = ({
  title = "",
  text = "",
  url = window.location.href,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer shouldScaleBackground open={open} onClose={() => setOpen(false)}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Share className="h-5 w-5" strokeWidth={2.5} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{detailShareConfig.title}</DrawerTitle>
          <DrawerDescription>{detailShareConfig.description}</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
          <div className="mx-auto flex ">
            <a
              title={title}
              target="_blank"
              href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                title,
              )}`}
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost" })}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.preventDefault();
                window.open(e.currentTarget.href, "_blank");
                setOpen(false);
              }}
            >
              <Twitter className="h-8 w-8" />
            </a>
          </div>
          <div className="mx-auto flex ">
            <a
              title={title}
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost" })}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.preventDefault();
                window.open(e.currentTarget.href, "_blank");
                setOpen(false);
              }}
            >
              <Facebook className="h-8 w-8" />
            </a>
          </div>
          <div className="mx-auto flex ">
            <a
              title={title}
              target="_blank"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost" })}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.preventDefault();
                window.open(e.currentTarget.href, "_blank");
                setOpen(false);
              }}
            >
              <Linkedin className="h-8 w-8" />
            </a>
          </div>

          <div className="mx-auto flex ">
            <a
              title={title}
              target="_blank"
              href={`mailto:?subject=${encodeURIComponent(
                title,
              )}&body=${encodeURIComponent(text + "\n\n")}${url}`}
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost" })}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.preventDefault();
                window.open(e.currentTarget.href, "_blank");
                setOpen(false);
              }}
            >
              <Mail className="h-8 w-8" />
            </a>
          </div>

          <div className="mx-auto flex ">
            <CopyButton url={url} />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="outline"
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.preventDefault();
                setOpen(false);
              }}
            >
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailPostShareButton;
