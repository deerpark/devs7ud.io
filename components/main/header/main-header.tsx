import { getUserId } from "@/lib/utils/user-id";
import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";

export default async function MainHeader() {
  const userId = await getUserId();
  return (
    <div className="w-full max-w-full flex-none md:w-auto md:max-w-sm">
      <MainDesktopNavigation userId={userId} />
      <MainMobileNavigation userId={userId} />
    </div>
  );
}
