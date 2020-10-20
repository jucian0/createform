module.exports = {
  title: 'UseForm', // Title for your website.
  tagline: 'UseFom provides a way to create complex forms easily.',
  url: 'https://useform.org', // Your website URL
  baseUrl: '/',
  favicon: 'img/form-complete.svg',
  organizationName: 'jucian0', // Usually your GitHub org/user name.
  projectName: 'useform', // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-168268483-1',
      anonymizeIP: true
    },
    navbar: {
      title: 'UseForm',
      logo: {
        alt: 'useform',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/get-starter',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/jucian0/useform',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Jucian0/useform/tree/docs',
        },
        themes: ['@docusaurus/theme-classic', '@docusaurus/theme-live-codeblock'],
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@docusaurus/plugin-google-analytics'),    
      {
        id: 'plugin-google-analytics',
      },
    ],
    [
      require.resolve('@docusaurus/plugin-sitemap'),
    {
      id: 'plugin-sitemap',
      cacheTime: 600 * 1000, // 600 sec - cache purge period
      changefreq: 'weekly',
      priority: 0.5,
    },
  ]],
};
