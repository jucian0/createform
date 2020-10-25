export default {
  "title": "UseForm",
  "tagline": "UseFom provides a way to create complex forms easily.",
  "url": "https://useform.org",
  "baseUrl": "/",
  "favicon": "img/form-complete.svg",
  "organizationName": "jucian0",
  "projectName": "useform",
  "themeConfig": {
    "googleAnalytics": {
      "trackingID": "UA-168268483-1",
      "anonymizeIP": true
    },
    "navbar": {
      "title": "UseForm",
      "logo": {
        "alt": "useform",
        "src": "img/logo.svg"
      },
      "items": [
        {
          "to": "docs/get-starter",
          "activeBasePath": "docs",
          "label": "Docs",
          "position": "left"
        },
        {
          "href": "https://github.com/jucian0/useform",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    }
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/home/barbosa/javascript/useform/packages/docs/sidebars.js",
          "editUrl": "https://github.com/Jucian0/useform/tree/docs"
        },
        "themes": [
          "@docusaurus/theme-classic",
          "@docusaurus/theme-live-codeblock"
        ],
        "theme": {
          "customCss": "/home/barbosa/javascript/useform/packages/docs/src/css/custom.css"
        }
      }
    ]
  ],
  "plugins": [
    [
      "/home/barbosa/javascript/useform/node_modules/@docusaurus/plugin-google-analytics/src/index.js",
      {
        "id": "plugin-google-analytics"
      }
    ],
    [
      "/home/barbosa/javascript/useform/node_modules/@docusaurus/plugin-sitemap/lib/index.js",
      {
        "id": "plugin-sitemap",
        "cacheTime": 600000,
        "changefreq": "weekly",
        "priority": 0.5
      }
    ]
  ],
  "onBrokenLinks": "throw",
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};