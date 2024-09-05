import { getUserId } from "@/lib/utils/user-id";
import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";

export default async function MainHeader() {
  const userId = await getUserId();
  return (
    <div className="sticky z-50 w-full max-w-full flex-none sm:w-auto sm:max-w-sm">
      <MainDesktopNavigation userId={userId} />
      <MainMobileNavigation userId={userId} />
    </div>
  );
}
