import React from 'react';
import { createStore } from './Store';
import {
  CreateFormArgs,
  Errors,
  EventChange,
  Field,
  HookArgs,
  KeyValue,
  Touched,
} from './Types';
import * as Dot from './ObjectUtils';
import { extractRadioElements, isCheckbox, isRadio } from './FieldsUtils';
import { validate } from './Validate';
import { StateChange } from '.';
import { InvalidArgumentException } from './Exception';

const defaultValues = {
  initialValues: {},
  initialErrors: {},
  initialTouched: {},
};

/**
 * createForm function create a form Store and return a hook that can be used to manage the form state.
 * @param args CreateFormArgs type that contains the initial values of form, initial errors of form, initial touched of form,
 * @returns {function(*): *} a function that returns a hook that can be used to manage the form state.
 **/
export function createForm<T extends CreateFormArgs<T['initialValues']>>(
  args: T
) {
  const { initialValues, initialErrors, initialTouched, validationSchema } = {
    ...defaultValues,
    ...args,
  };

  const mode = args.mode === 'debounce' ? 'onChange' : args.mode;
  const debouncedTime = args.mode === 'debounce' ? 500 : 0;
  /**
   * This is the store of the form,
   * it is an object that contains the values of form,
   * errors of form,
   * touched of form.
   **/
  const $store = createStore(
    {
      values: initialValues,
      errors: initialErrors,
      touched: initialTouched,
      isValid: Dot.isEmpty(initialErrors),
    },
    debouncedTime
  );

  /**
   * This is the reference of all native inputs of the form,
   * in order to have the same reference of all inputs of the form.
   **/
  const inputsRefs = {} as { [k: string]: React.RefObject<any> };

  return (hookArgs?: HookArgs<T['initialValues']>) => {
    const state = React.useSyncExternalStore(
      (fn) => $store.subscribe(fn, mode ?? 'onSubmit'),
      $store.get
    );

    /**
     * This function will handle change events of the form,
     * @param event the event that will be handled
     **/
    async function onChange(event: EventChange) {
      const { name, value, checked } = event.target;

      const nextValue =
        event.detail !== undefined && (event as any).detail !== 0
          ? event.detail
          : value;

      if (isCheckbox(event.target as Field)) {
        $store.patch(`values.${name}`, checked);
      } else {
        $store.patch(`values.${name}`, nextValue);
      }

      if (hookArgs?.onChange) {
        hookArgs.onChange($store.getPropertyValue('values'));
      }
    }

    /**
     * This function will handle blur events
     * @param event the event that will be handled
     **/
    function onBlur(event: React.FocusEvent<HTMLInputElement>) {
      const { name } = event.target;
      $store.patch(`touched.${name}`, true);

      if (hookArgs?.onBlur) {
        hookArgs.onBlur($store.getPropertyValue('values'));
      }

      if (validationSchema) {
        handleValidate();
      }
    }

    async function handleValidate() {
      try {
        await validate($store.getPropertyValue('values'), validationSchema);
        $store.patch('isValid', true);
        $store.patch('errors', {});
      } catch (errors: any) {
        $store.patch('isValid', false);
        $store.patch('errors', errors);
      }
    }

    /**
     * This function will set the value into input ref,
     * @param name the name of the input
     * @param value the value of the input
     **/
    function setFieldRefValue(name: string, value: any) {
      const ref = inputsRefs[name];
      if (ref && ref.current) {
        ref.current.value = value;
        if (isCheckbox(ref.current)) {
          ref.current.checked = value;
        } else if (isRadio(ref.current)) {
          const radios = extractRadioElements(ref.current);
          for (const radio of radios) {
            radio.checked = radio.value === value;
          }
        }
      } else {
        throw Error(
          `Input with name '${name}' is not registered, verify the input name.`
        );
      }
    }

    function register(name: string) {
      if (!name) {
        throw new InvalidArgumentException('Input name is required');
      }
      const defaultValue = Dot.get(state.values, name);
      const ref = React.useRef(null);

      React.useEffect(() => {
        (inputsRefs as any)[name] = ref;
      }, [ref]);

      return {
        ref,
        defaultValue,
        onChange,
        onBlur,
        name,
      };
    }

    /**
     * This function will handle form submit
     **/
    function handleSubmit(
      submit: (values: T['initialValues'], isValid: boolean) => void
    ) {
      if (typeof submit !== 'function') {
        throw Error('Submit function is required');
      }
      /**
       * This function will handle submit event
       * @param event the event that will be handled
       **/
      return (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const state = $store.get();
        $store.set(state, 'onSubmit');
        const { values, isValid } = state;
        submit(values, isValid);
      };
    }

    /**
     * This function will handle form submit
     **/
    function handleReset(reset: (values: T['initialValues']) => void) {
      if (typeof reset !== 'function') {
        throw Error('Submit function is required');
      }
      /**
       * This function will handle submit event
       * @param event the event that will be handled
       **/
      return (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        $store.set(
          {
            values: initialValues,
            errors: initialErrors,
            touched: initialTouched,
            isValid: false,
          },
          'onSubmit'
        );

        for (const key in inputsRefs) {
          if (inputsRefs[key]?.current?.value) {
            const value = Dot.get(initialValues, key);
            setFieldRefValue(key, value);
          }
        }

        reset(initialValues);
      };
    }

    /**
     * This function will set the value into input ref,
     * @param name the name of the input
     * @param value the value of the input
     **/
    function setFieldValue(name: string, value: any) {
      try {
        setFieldRefValue(name, value);
        $store.patch(`values.${name}`, value);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * This function will set all inputs value into the input elements,
     * @param values the values of the form
     **/
    function setFieldsValue(next: StateChange<T['initialValues']>) {
      //@ts-ignore
      const nextValues = typeof next === 'function' ? next(state.values) : next;
      try {
        for (const key in inputsRefs) {
          if (inputsRefs[key]?.current?.value) {
            setFieldRefValue(key, next);
          }
        }

        $store.patch('values', nextValues);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * This function will set the error into the state of the form,
     * @param name the name of the input
     * @param error the error of the input
     **/
    function setFieldError(name: string, message: string) {
      try {
        $store.patch(`errors.${name}`, message);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * This function will set all inputs error into the state of the form,
     * @param errors the errors of the form
     **/
    function setFieldsError(next: StateChange<Errors<T['initialValues']>>) {
      const nextErrors =
        typeof next === 'function' ? next($store.get().errors) : next;
      try {
        $store.patch('errors', nextErrors);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * This function will set the touched into the state of the form,
     * @param name the name of the input
     * @param touched the touched of the input
     **/
    function setFieldTouched(name: string, value = true) {
      try {
        $store.patch(`touched.${name}`, value);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * This function will set all inputs touched into the state of the form,
     * @param touched the touched of the form
     **/
    function setFieldsTouched(next: StateChange<Touched<T['initialValues']>>) {
      const nextTouched =
        typeof next === 'function' ? next($store.get().touched) : next;
      try {
        $store.patch('touched', nextTouched);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * This function will reset the form as initial values,
     **/
    function resetValues() {
      setFieldsValue(initialValues as T['initialValues']);
    }

    /**
     * This function will reset the form as initial errors,
     **/
    function resetErrors() {
      $store.patch('errors', initialErrors as Errors<T['initialErrors']>);
    }

    /**
     * This function will reset the form as initial touched,
     **/
    function resetTouched() {
      $store.patch('touched', initialTouched as Touched<T['initialTouched']>);
    }

    return {
      $form: $store,
      state,
      register,
      handleReset,
      handleSubmit,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      setFieldsValue,
      setFieldsError,
      setFieldsTouched,
      resetErrors,
      resetTouched,
      resetValues,
    };
  };
}
