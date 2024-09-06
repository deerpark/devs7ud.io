import { mainFooterConfig } from "@/config/main";
import Link from "next/link";
import { v4 } from "uuid";
import MainNewsletter from "./main-newsletter";

const MainFooter = () => {
  return (
    <footer
      className="flex w-full flex-none flex-col items-center justify-center border-t border-border/50"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-5xl pt-20 sm:pt-24 md:px-10 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">카테고리</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.categories.map((category) => (
                    <li key={v4()}>
                      <Link
                        href={
                          category.slug === "/"
                            ? category.slug
                            : `/category/${category.slug}`
                        }
                        className="text-sm leading-6 text-foreground/80 hover:underline"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">페이지</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.pages.map((page) => (
                    <li key={v4()}>
                      <Link
                        href={page.slug}
                        className="text-sm leading-6 text-foreground/80 hover:underline"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">소셜미디어</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.socials.map((social) => (
                    <li key={v4()}>
                      <Link
                        href={social.url}
                        target="_blank"
                        className="text-sm leading-6 text-foreground/80 hover:underline"
                      >
                        {social.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">정책</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {mainFooterConfig.legals.map((legal) => (
                    <li key={v4()}>
                      <Link
                        href={legal.slug}
                        className="text-sm leading-6 text-foreground/80 hover:underline"
                      >
                        {legal.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <MainNewsletter />
        </div>
      </div>
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-x-10 border-t border-border/30 px-6 py-8 sm:mt-20 md:flex-row md:px-10 lg:mt-24">
        <div className="flex space-x-6 md:order-2">
          {mainFooterConfig.socials.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-muted-foreground/50 hover:text-muted-foreground/100"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-sm leading-5 text-muted-foreground/50 hover:text-muted-foreground/100 md:order-1 md:mt-0">
          {mainFooterConfig.copyright}
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;
