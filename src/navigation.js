import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Features',
      href: getPermalink('/#features'),
    },
    {
      text: 'Pricing',
      href: getPermalink('/#pricing'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{
    text: 'Start Syncing', variant: "primary",
    icon: 'tabler:calendar-repeat',
    href: getPermalink("/sign-up"),
    // target: '_blank'
  }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/#features' },
        { text: 'Pricing', href: '/#pricing' },
        { text: 'Enterprise', href: '/#pricing' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Guides', href: getPermalink('/guides') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/syncalapp' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/SynCalApp' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
  >© 2024 <a href="https://evene.es/" class="hover:underline"
    >SynCal</a
  >
</span>
  `,
};
