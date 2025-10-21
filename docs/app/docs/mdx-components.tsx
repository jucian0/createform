import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { OnSubmitFormDemo } from '@/demos/on-submit-demo';
import { OnChangeFormDemo } from '@/demos/on-change-demo';
import Demo from '@/demos/demo';
import { NativeFormDemo } from '@/demos/native-demo';
import { DebouncedFormDemo } from '@/demos/debounced-demo';
import { CustomFormDemo } from '@/demos/custom-demo';
import { InlineFormDemo } from '@/demos/inline-validation-demo';

export function getMDXComponents(components?: any) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
    InlineFormDemo: InlineFormDemo,
    CustomFormDemo: CustomFormDemo,
    DebouncedFormDemo: DebouncedFormDemo,
    NativeFormDemo: NativeFormDemo,
    Demo: Demo,
    OnChangeFormDemo: OnChangeFormDemo,
    OnSubmitFormDemo: OnSubmitFormDemo,
  };
}