import { protectedPostConfig } from "@/config/protected";

const ProtectedBookMarkTableTitle = () => {
  return (
    <>
      <div className="mb-5 flex flex-row border-b border-border pb-5">
        <div className="flex-none items-center justify-start">
          <h1 className="text-base font-semibold leading-6">
            {protectedPostConfig.title}
          </h1>
          <p className="mt-2 text-sm">{protectedPostConfig.description}</p>
        </div>
        <div className="flex-grow"></div>
      </div>
    </>
  );
};

export default ProtectedBookMarkTableTitle;
