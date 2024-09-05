import { mainPagePolicyConfig } from "@/config/main/pages";
import * as React from "react";

const MainPolicyPage = () => {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <h2 className="px-3 text-xl font-black">
          {mainPagePolicyConfig.title}
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-2 lg:px-3">
        <h3 className="my-6 leading-7">{mainPagePolicyConfig.description}</h3>

        {mainPagePolicyConfig.paragraphs.map((item) => (
          <>
            <p className="mt-6 text-lg font-semibold">{item.title}</p>
            <p className="mt-2 leading-8 text-foreground/80">
              {item.description}
            </p>
          </>
        ))}
      </div>
    </>
  );
};

export default MainPolicyPage;
