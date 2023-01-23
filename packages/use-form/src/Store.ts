import { debounce } from './Debounce';
import * as Dot from './ObjectUtils';
import { Mode } from './Types';

type Subscribe<TValues> = (e: TValues) => void;

export function createStore<T extends {}>(
  initialState: T = Object.assign({}),
  delay = 0
) {
  let state = initialState;
  let subscribers: Map<Mode, Subscribe<T>> = new Map();

  function get(): T {
    return state;
  }

  function subscribe(fn: Subscribe<T>, mode: Mode) {
    subscribers.set(mode, fn);

    return () => {
      subscribers.delete(mode);
    };
  }

  function set(nextState: T, event: Mode = 'onChange') {
    state = nextState;
    debouncedNotify(event);
  }

  function patch(path: string, next: any, event: Mode = 'onChange') {
    const nextState = Dot.set(state, path, next);
    if (typeof nextState !== 'undefined') {
      state = nextState;
      debouncedNotify(event);
    } else {
      throw new Error(`The path '${path}' is not defined`);
    }
  }

  function getPropertyValue(path: string) {
    return Dot.get(state, path);
  }

  function getInitialPropertyValue(path: string) {
    return Dot.get(initialState, path);
  }

  function getInitialState(): T {
    return initialState;
  }

  const debouncedNotify = debounce((event: Mode = 'onSubmit') => {
    const callback = subscribers.get(event);
    callback?.(get());
  }, delay);

  return {
    get,
    set,
    patch,
    subscribe,
    getPropertyValue,
    getInitialState,
    getInitialPropertyValue,
  };
}
