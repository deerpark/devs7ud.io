import { sharedForbiddenConfig } from "@/config/shared";
import { OctagonMinus } from "lucide-react";

const SharedForbidden = () => {
  return (
    <div className="mx-5 my-5 rounded-lg border-2 border-dashed bg-background p-12 text-center">
      <OctagonMinus
        size={64}
        className="mx-auto block text-foreground/50"
        strokeWidth={1.5}
      />
      <h3 className="mt-2 text-lg font-semibold">
        {sharedForbiddenConfig.title}
      </h3>
      <p className="mt-1 text-sm text-foreground/80">
        {sharedForbiddenConfig.description}
      </p>
    </div>
  );
};

export default SharedForbidden;
