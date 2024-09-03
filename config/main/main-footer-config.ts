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
      title: "홈",
      slug: "/",
    },
    {
      title: "소개",
      slug: "/me",
    },
    {
      title: "연락하기",
      slug: "/contact",
    },
  ],

  socials: [
    {
      name: "페이스북",
      url: "https://facebook.com/devs7udio",
      icon: FacebookIcon,
    },
    {
      name: "깃허브",
      url: "https://github.com/deerpark",
      icon: GithubIcon,
    },
    {
      name: "인스타그램",
      url: "https://instagram.com/devs7udio",
      icon: InstagramIcon,
    },
    {
      name: "트위터",
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
      title: "서비스 약관",
      slug: "/terms",
    },
    {
      title: "개인정보보호정책",
      slug: "/policy",
    },
  ],
  copyright: "© 2023 devs7ud.io. All rights reserved.",
};

export default mainFooterConfig;
