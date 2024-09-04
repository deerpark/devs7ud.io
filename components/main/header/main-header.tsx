import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";

export default function MainHeader() {
  return (
    <div className="sticky z-50 w-full max-w-full flex-none sm:w-auto sm:max-w-sm">
      <MainDesktopNavigation />
      <MainMobileNavigation />
    </div>
  );
}
