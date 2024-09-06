import { cn } from "@/lib/utils";
import * as React from "react";

interface LogoIconProps {
  className?: string;
  pathClassName?: string;
  strokeWidth?: number;
}

const LogoIcon: React.FC<LogoIconProps & React.SVGProps<SVGSVGElement>> = ({
  pathClassName,
  strokeWidth = 3,
  ...props
}) => {
  return (
    <svg
      {...props}
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1.5H1.5V3V5.5656V7.0656H3H8.54754L2.22462 17.9602L2.22461 17.9602L2.22198 17.9648C2.14175 18.1041 2.01409 18.3584 1.97919 18.6906C1.93832 19.0796 2.03251 19.5545 2.38521 19.9435C2.68875 20.2783 3.04879 20.3968 3.2381 20.4427C3.44186 20.4921 3.62641 20.5 3.75 20.5L6.55484 20.5L7.42285 20.5L7.85536 19.7474L16.6651 4.41815L16.6693 4.41074L16.6735 4.40328C16.8191 4.14307 17.2242 3.34819 16.7973 2.50192C16.3257 1.56724 15.3469 1.5 15 1.5H3ZM14.0581 2.93339C14.0581 2.93339 14.058 2.93379 14.0575 2.93461L14.0564 2.93657C14.0575 2.93447 14.0581 2.93341 14.0581 2.93339Z"
        className={cn("fill-background stroke-foreground", pathClassName)}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default LogoIcon;
