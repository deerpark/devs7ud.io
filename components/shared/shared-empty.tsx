import { sharedEmptyConfig } from "@/config/shared";
import { Eraser } from "lucide-react";

const SharedEmpty = () => {
  return (
    <div className="mx-auto my-5 max-w-3xl rounded-lg border-2 border-dashed bg-background p-12 text-center">
      <Eraser
        size={64}
        className="mx-auto block text-foreground/50"
        strokeWidth={1.5}
      />
      <h3 className="mt-2 text-lg font-semibold">{sharedEmptyConfig.title}</h3>
      <p className="mt-1 text-sm text-foreground/80">
        {sharedEmptyConfig.description}
      </p>
    </div>
  );
};

export default SharedEmpty;
