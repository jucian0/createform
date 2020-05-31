export default {
  "plugins": [],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "navbar": {
      "title": "React Data Forms",
      "logo": {
        "alt": "react-data-forms-logo",
        "src": "img/logo.svg"
      },
      "links": [
        {
          "to": "docs/get-starter",
          "activeBasePath": "docs",
          "label": "Docs",
          "position": "left"
        },
        {
          "href": "https://github.com/jucian0/react-data-forms",
          "label": "GitHub",
          "position": "right"
        }
      ]
    }
  },
  "title": "React Data Forms",
  "tagline": "A package to create advanced forms.",
  "url": "https://www.react-data-forms.org",
  "baseUrl": "/",
  "favicon": "img/form-complete.svg",
  "organizationName": "jucian0",
  "projectName": "react-data-forms",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "homePageId": "doc1",
          "sidebarPath": "/Users/barbosa/javascript/react-data-forms/sidebars.js",
          "editUrl": "https://github.com/Jucian0/react-data-forms/tree/docs"
        },
        "themes": [
          "@docusaurus/theme-classic",
          "@docusaurus/theme-live-codeblock"
        ],
        "theme": {
          "customCss": "/Users/barbosa/javascript/react-data-forms/src/css/custom.css"
        }
      }
    ]
  ]
};