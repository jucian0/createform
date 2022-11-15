import React, { Fragment } from 'react';
import { Field } from '.';

type Props = {
  component: React.JSXElementConstructor<any>;
} & any;

function WrapperComponent(
  { component, ...rest }: Props,
  ref: React.RefObject<Field>
) {
  const Component = component;
  const [value, setValue] = React.useState<any>(null);

  function handleOnChange(e: any) {
    if (ref.current) {
      ref.current.value = e;
      ref.current?.dispatchEvent(new CustomEvent('input', { detail: e }));
    }
  }

  function handleOnBlur(e: any) {
    if (ref.current) {
      ref.current.value = e;
      ref.current?.dispatchEvent(new CustomEvent('blur', { detail: true }));
    }
  }

  function handleEvent(e: any) {
    setValue(e.detail ?? e.target.value);
  }

  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('input', handleEvent);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('input', handleEvent);
      }
    };
  }, [ref.current]);

  return (
    <Fragment>
      <div ref={ref} hidden />
      <Component
        {...rest}
        value={value}
        selected={ref.current?.value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </Fragment>
  );
}

export const Wrapper = React.forwardRef(
  WrapperComponent as React.ForwardRefRenderFunction<unknown, Props>
);
