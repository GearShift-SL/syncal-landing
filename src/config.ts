type SiteConfig = {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
  logo?: string;
  ogImage: string;
  locale: string;
  twitter: {
    site: string;
  };
};

type Link = {
  text: string;
  href: string;
};

type Action = {
  href: string;
  text: string;
  icon?: string;
};

type FooterLinkGroup = {
  title: string;
  links: Link[];
};

type SocialLink = {
  ariaLabel: string;
  icon: string;
  href: string;
};

type NavigationConfig = {
  header: {
    links: Link[];
    actions: Action[];
  };
  footer: {
    links: FooterLinkGroup[];
    secondaryLinks: Link[];
    socialLinks: SocialLink[];
    footNote: string;
  };
};

export const SITE = (): SiteConfig => {
  return {
    title: "SynCal - Sync your Google and Outlook calendars",
    description:
      "SynCal is a tool that syncs your Google and Outlook calendars automatically, with privacy and security in mind.",
    author: "Daniel García",
    siteUrl: "https://syncal.app/",
    ogImage: "/src/assets/images/og-image.webp", // Needs to be an absolute path /src/...
    locale: "en_US",
    twitter: {
      site: "@syncalapp",
    },
  };
};

export const NAVIGATION = (): NavigationConfig => ({
  header: {
    links: [],
    actions: [
      {
        href: `/#hero`,
        text: "Start syncing",
        // icon: 'tabler:rocket',
      },
    ],
  },

  footer: {
    links: [
      {
        title: "Support",
        links: [
          { text: "Contact", href: `/contact/` },
          { text: "Blog", href: `/blog/` },
          { text: "Guides", href: `/guides/` },
        ],
      },
      {
        title: "SynCal",
        links: [
          { text: "How it works", href: `/#features` },
          { text: "About us", href: `/#about` },
          { text: "Changelog", href: `/changelog/` },
        ],
      },
      {
        title: "GearShift Universe",
        links: [
          { text: "GearShift", href: "https://gearshift.es/" },
          { text: "postify AI", href: "https://postifyai.com/" },
          { text: "Estavia", href: "https://estavia.ai/" },
          { text: "AutoIPC", href: "https://autoipc.es/" },
          { text: "SynCal", href: "https://syncal.app/" },
        ],
      },
    ],
    secondaryLinks: [
      { text: "Terms and conditions", href: `/terms/` },
      { text: "Privacy policy", href: `/privacy/` },
    ],
    socialLinks: [
      {
        ariaLabel: "X",
        icon: "tabler:brand-x",
        href: "https://x.com/syncalapp",
      },
      // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/autoipc' },
      // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/autoipc' },
      { ariaLabel: "RSS", icon: "tabler:rss", href: `/rss.xml` },
    ],
    footNote: `
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2025 <a href="/" class="hover:underline"
          >SynCal</a
        >
      </span>
        `,
  },
});
