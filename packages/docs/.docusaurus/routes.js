
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','7f9'),
  
  routes: [
{
  path: '/docs/ContextFormAPI',
  component: ComponentCreator('/docs/ContextFormAPI','651'),
  exact: true,
},
{
  path: '/docs/controlled-form',
  component: ComponentCreator('/docs/controlled-form','878'),
  exact: true,
},
{
  path: '/docs/debounce-form',
  component: ComponentCreator('/docs/debounce-form','6c5'),
  exact: true,
},
{
  path: '/docs/quick-start',
  component: ComponentCreator('/docs/quick-start','f46'),
  exact: true,
},
{
  path: '/docs/uncontrolled-form',
  component: ComponentCreator('/docs/uncontrolled-form','a01'),
  exact: true,
},
{
  path: '/docs/useFormAPI',
  component: ComponentCreator('/docs/useFormAPI','e02'),
  exact: true,
},
{
  path: '/docs/useValidation',
  component: ComponentCreator('/docs/useValidation','a1e'),
  exact: true,
},
{
  path: '/docs/validation',
  component: ComponentCreator('/docs/validation','ea2'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
