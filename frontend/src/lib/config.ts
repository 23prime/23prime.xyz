export const SITE_CONFIG = {
  name: "23prime",
  nickname: "Okkey",
  title: "Software Developer",
  profileImage: "/23prime.png",
  email: "okkey@mail.23prime.xyz",
  links: {
    github: "https://github.com/23prime",
    twitter: "https://x.com/23_prime",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
