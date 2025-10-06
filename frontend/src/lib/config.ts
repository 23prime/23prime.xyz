export const SITE_CONFIG = {
  name: "23prime",
  title: "Software Developer",
  profileImage: "/23prime.png",
  links: {
    github: "https://github.com/23prime",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
