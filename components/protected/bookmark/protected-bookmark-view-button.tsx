import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProtectedBookMarkViewButtonProps {
  slug?: string;
}

const ProtectedBookMarkViewButton: FC<ProtectedBookMarkViewButtonProps> = ({
  slug,
}) => {
  return (
    <Link
      href={`/posts/${slug}`}
      target="_blank"
      className="rounded-md border bg-accent/50 px-3 py-2 hover:bg-accent"
    >
      <EyeIcon className="h-4 w-4" />
    </Link>
  );
};

export default ProtectedBookMarkViewButton;
