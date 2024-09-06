import { FC } from "react";

interface IconProps {
  className?: string;
}

const GoogleIcon: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      fill="currentColor"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
};

export default GoogleIcon;
