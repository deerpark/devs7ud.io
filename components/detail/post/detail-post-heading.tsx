import { CustomImage } from "@/components/shared/shared-image";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { ClockIcon } from "lucide-react";
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
  const date = format(parseISO(updated_at!), "yyyy년 MM월 dd일", {
    locale: ko,
  });
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
            <ClockIcon
              className="h-4 w-4 text-foreground/50"
              aria-hidden="true"
            />
            <span className="flex items-center gap-x-1">
              <span className="text-sm">
                리딩타임 약 {getMinutes(readTime.minutes)}
              </span>
            </span>
          </span>
        </div>
      </div>
      {description && (
        <p className="px-14 pb-5 text-sm text-foreground/80">{description}</p>
      )}
      {image ? (
        <CustomImage
          src={await getPublicImageUrl("cover-image", image)}
          alt={title || ""}
          width={512}
          height={256}
          className="aspect-[2/1] w-full rounded-[30px] bg-background object-cover ring-1 ring-foreground/10 hover:rounded-[30px] hover:ring hover:ring-primary"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(512, 256),
          )}`}
          viewer
        />
      ) : null}
    </section>
  );
};

export default DetailPostHeading;
