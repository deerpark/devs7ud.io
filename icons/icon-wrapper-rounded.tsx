import { FC, ReactNode } from "react";

interface IconWrapperRoundedProps {
  children: ReactNode;
}

const IconWrapperRounded: FC<IconWrapperRoundedProps> = ({ children }) => {
  return (
    <div className="to-accent-/50 hover:to-accent-/50 flex items-center rounded-full bg-gradient-to-t from-border via-accent p-1 text-center shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-border hover:via-accent active:scale-[96%] active:ring-black/20">
      {children}
    </div>
  );
};

export default IconWrapperRounded;
