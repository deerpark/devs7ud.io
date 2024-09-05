import { CustomImage } from "@/components/shared/shared-image";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { format, parseISO } from "date-fns";
import { ArchiveIcon, CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import readingTime, { ReadTimeResults } from "reading-time";

interface DetailPostHeadingProps {
  post: PostWithCategoryWithProfile;
}

const DetailPostHeading: FC<DetailPostHeadingProps> = async ({ post }) => {
  const {
    title,
    description,
    image,
    profiles: { username: authorName, avatar_url: authorImage },
    updated_at,
    content,
  } = post;
  const date = format(parseISO(updated_at!), "MMMM dd, yyyy");
  const readTime: ReadTimeResults = readingTime(content ? content : "");
  return (
    <section className="flex flex-col items-start justify-between gap-y-5">
      <div className="flex items-center gap-x-2">
        {/* Author */}
        {authorImage ? (
          <div className="h-12 w-12">
            <CustomImage
              src={authorImage}
              height={48}
              width={48}
              alt={authorName || "Avatar"}
              className="flex h-12 w-12 rounded-full border object-cover shadow-sm"
              priority
              placeholder="blur"
              blurDataURL={shimmer(48, 48)}
            />
          </div>
        ) : null}
        <div className="flex flex-col">
          <span className="flex text-sm font-bold">{authorName}</span>
          <span className="flex items-center gap-x-2 text-sm text-foreground/70">
            <span className="flex items-center gap-x-1">
              <span>{date}</span>
            </span>
            <span className="flex items-center gap-x-1">
              <ClockIcon
                className="h-4 w-4 text-foreground/50"
                aria-hidden="true"
              />
              <span className="text-sm">{getMinutes(readTime.minutes)}</span>
            </span>
          </span>
        </div>
      </div>
      {description && <p className="text-foreground/70">{description}</p>}
      {image ? (
        <div className="relative w-full">
          <CustomImage
            src={await getPublicImageUrl("cover-image", image)}
            alt={title || ""}
            width={512}
            height={288}
            className="h-[288px] w-full rounded-2xl bg-gray-100 object-cover"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(512, 288),
            )}`}
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      ) : null}
    </section>
  );
};

export default DetailPostHeading;
