import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/icons/socials";
import { FooterType } from "@/types";
import { default as mainCategoryConfig } from "./main-category-config";

const mainFooterConfig: FooterType = {
  categories: mainCategoryConfig,
  pages: [
    {
      title: "Home",
      slug: "/",
    },
    {
      title: "Me",
      slug: "/me",
    },
    {
      title: "Contact",
      slug: "/contact",
    },
  ],

  socials: [
    {
      name: "Facebook",
      url: "https://facebook.com/devs7udio",
      icon: FacebookIcon,
    },
    {
      name: "Github",
      url: "https://github.com/deerpark",
      icon: GithubIcon,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/devs7udio",
      icon: InstagramIcon,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/devs7udio",
      icon: TwitterIcon,
    },
    {
      name: "Youtube",
      url: "https://youtube.com/devs7udio",
      icon: YoutubeIcon,
    },
  ],
  legals: [
    {
      title: "Terms",
      slug: "/terms",
    },
    {
      title: "Policy",
      slug: "/policy",
    },
  ],
  copyright: "© 2023 devs7ud.io. All rights reserved.",
};

export default mainFooterConfig;
