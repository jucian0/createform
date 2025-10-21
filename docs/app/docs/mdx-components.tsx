import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';

export function getMDXComponents(components?: any) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
  };
}