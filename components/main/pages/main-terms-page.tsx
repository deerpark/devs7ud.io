import { mainPageTermsConfig } from "@/config/main/pages";
import React from "react";

const MainTermsPage = () => {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <h2 className="px-3 text-xl font-black">{mainPageTermsConfig.title}</h2>
      </div>
      <div className="mx-auto max-w-7xl px-2 lg:px-3">
        {mainPageTermsConfig.paragraphs.map((item) => (
          <>
            <p className="text-md mt-5 leading-8 text-foreground/80">
              {item.description}
            </p>
          </>
        ))}
      </div>
    </>
  );
};

export default MainTermsPage;
