import * as React from 'react';

export const useUpdateState = <S>(initial: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = React.useState<S>(initial);
  React.useEffect(() => setState(initial), [initial]);
  return [state, setState];
};

// const simpleFn = (..._args: any): void => {};
export const useOnceCallback = <T extends (...args: any) => any>(
  callback: (...args: Parameters<T>) => void,
): ((...args: Parameters<T>) => void) => {
  const [once, setOnce] = React.useState<boolean>(false);

  return React.useCallback(
    (...args: Parameters<T>) => {
      if (!once) {
        callback(...args);
        setOnce(false);
      }
    },
    [callback, once],
  );
};

export const useLaunch = <T>(hook: (...args: any) => T, shouldRender: boolean): T | undefined => {
  return shouldRender ? hook() : undefined;
};

/**
 * https://github.com/jaredLunde/react-hook/tree/master/packages/previous
 */
export const usePrevious = <T>(value: T): React.MutableRefObject<T>['current'] => {
  const storedValue = React.useRef(value);
  React.useEffect(() => {
    storedValue.current = value;
  }, [value]);
  return storedValue.current;
};

export const useStoredValue = <S>(initial: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>] => {
  // JSON.stringify может работать медленно при очень больших объемах данных.
  const storedHash = React.useRef(JSON.stringify(initial));
  const [storedValue, setStoredValue] = React.useState<S>(initial);
  React.useEffect(() => {
    const valueHash = JSON.stringify(initial);
    if (storedHash.current !== valueHash) {
      setStoredValue(initial);
      storedHash.current = valueHash;
    }
  }, [initial]);
  return [storedValue, setStoredValue];
};

/**
 * Хук для отложенного выполнения функции fn через debounceTime миллисекунд
 * после изменения параметров, переданных в массиве deps
 */
export const useDebounce = (callback: () => void, debounceTime: number = 300) => {
  React.useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [callback, debounceTime]);
};
