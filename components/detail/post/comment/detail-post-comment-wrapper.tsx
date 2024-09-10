import React, { FC } from "react";

interface DetailPostCommentWrapperProps {
  children?: React.ReactNode;
}

const DetailPostCommentWrapper: FC<DetailPostCommentWrapperProps> = ({
  children,
}) => {
  return (
    <div
      id="comments"
      className="-mx-5 my-5 flex max-w-5xl flex-col gap-y-3 border-y border-border/50 bg-muted/50 p-3 md:mx-auto md:rounded-2xl md:border-y-0"
    >
      {children}
    </div>
  );
};

export default DetailPostCommentWrapper;
