import { CustomImage } from "@/components/shared/shared-image";
import { dashBoardMenu } from "@/config/shared/dashboard";
import { cn, getUrl } from "@/lib/utils";
import { getUserId } from "@/lib/utils/user-id";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

const ProtectedDesktopSideBar = ({ userId }: { userId?: string }) => {
  const currentPath = usePathname();
  const path = currentPath.split("/");
  const pathSlug = `/${path.slice(1, 3).join("/")}`;
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
          <Link href={getUrl()} className="flex h-16 shrink-0 items-center">
            <CustomImage
              className="h-[40px]w-[40px]w-auto"
              src="/images/logo.png"
              alt="Logo"
              height={40}
              width={40}
              priority
            />
          </Link>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {dashBoardMenu.map((menu) => (
                    <li
                      key={v4()}
                      className={
                        userId !== "f62f3c03-a769-4bd9-aa15-b3fe68b86954"
                          ? "hidden"
                          : ""
                      }
                    >
                      <Link
                        href={menu.slug || ""}
                        className={cn(
                          currentPath === menu.slug ||
                            (path.length > 3 && pathSlug === menu.slug)
                            ? "bg-accent text-primary"
                            : "text-accent-foreground hover:bg-accent hover:text-primary",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                      >
                        <menu.icon
                          className={cn(
                            currentPath === menu.slug
                              ? "text-primary"
                              : "group-hover:text-primary",
                            "h-6 w-6 shrink-0",
                          )}
                          aria-hidden="true"
                        />
                        {menu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProtectedDesktopSideBar;
