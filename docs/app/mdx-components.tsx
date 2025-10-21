import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { InlineFormDemo } from './demos/inline-validation-demo';
import { CustomFormDemo } from './demos/custom-demo';
import { DebouncedFormDemo } from './demos/debounced-demo';
import { NativeFormDemo } from './demos/native-demo';
import Demo from './demos/demo';
import { OnChangeFormDemo } from './demos/on-change-demo';
import { OnSubmitFormDemo } from './demos/on-submit-demo';

export function getMDXComponents(components?: any) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
    // InlineFormDemo: InlineFormDemo,
    // CustomFormDemo: CustomFormDemo,
    // DebouncedFormDemo: DebouncedFormDemo,
    // NativeFormDemo: NativeFormDemo,
    // Demo: Demo,
    // OnChangeFormDemo: OnChangeFormDemo,
    // OnSubmitFormDemo: OnSubmitFormDemo,
  };
}