import * as Dot from './ObjectUtils';

type Subscribe<TValues> = (e: TValues) => void;
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>;

export function createStore<T extends {}>(initialState: T = Object.assign({})) {
  let state = initialState;
  let subscribers: Subscribers<T> = [];

  function get(): T {
    return state;
  }

  function subscribe(fn: Subscribe<T>) {
    subscribers = [...subscribers, fn];

    return () => {
      subscribers = subscribers.filter((l) => l !== fn);
    };
  }

  function set(nextState: T) {
    state = nextState;
    notify();
  }

  function patch(path: string, next: any) {
    const nextState = Dot.set(state, path, next);
    if (typeof nextState !== 'undefined') {
      state = nextState;
      notify();
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

  function notify() {
    subscribers.forEach((fn) => {
      fn(get());
    });
  }

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
