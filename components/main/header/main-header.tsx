import { MainDesktopNavigation, MainMobileNavigation } from "./navigations";

export default function MainHeader() {
  return (
    <div className="sticky top-0 z-50 shadow-sm backdrop-blur-lg">
      <MainDesktopNavigation />
      <MainMobileNavigation />
    </div>
  );
}
