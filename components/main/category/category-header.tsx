"use client";

export default function CategoryHeader({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-2 border-b border-border/50 bg-background py-4 md:border-b-0 md:pt-9">
      <h2 className="px-6 text-xl font-black md:px-5">{title}</h2>
    </div>
  );
}
