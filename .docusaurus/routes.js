
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/controlled-input',
  component: ComponentCreator('/docs/controlled-input'),
  exact: true,
  
},
{
  path: '/docs/custom-input',
  component: ComponentCreator('/docs/custom-input'),
  exact: true,
  
},
{
  path: '/docs/debounced-input',
  component: ComponentCreator('/docs/debounced-input'),
  exact: true,
  
},
{
  path: '/docs/get-starter',
  component: ComponentCreator('/docs/get-starter'),
  exact: true,
  
},
{
  path: '/docs/mdx',
  component: ComponentCreator('/docs/mdx'),
  exact: true,
  
},
{
  path: '/docs/readme',
  component: ComponentCreator('/docs/readme'),
  exact: true,
  
},
{
  path: '/docs/uncontrolled-input',
  component: ComponentCreator('/docs/uncontrolled-input'),
  exact: true,
  
},
{
  path: '/docs/validation',
  component: ComponentCreator('/docs/validation'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
