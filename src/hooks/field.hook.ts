import * as React from 'react';

import { useStoredValue } from './helper.hook';

type TInputErrorData = {
  key: string;
  options?: Record<string, unknown>;
};
type TInputTranslateFn = (key: TInputErrorData['key'], options?: TInputErrorData['options']) => string;

const defaultT: TInputTranslateFn = (key, _options) => key;

/**
 * useField hook
 * const [state, changeState, { error, setError: setData, blur }] = useField('', { translate: t });
 */
const useField = <T = string, E = T, R = T>(
  initialState: T | (() => T),
  props:
    | Partial<{
        onBlurChanged: () => void;
        onChanged: () => void;
        translate: TInputTranslateFn;
        formatter: (event: E) => T;
        result: (state: T) => R;
      }>
    | undefined = {},
): [
  state: T,
  change: (newValue: E) => void,
  actions: {
    error: string;
    setError: (key: TInputErrorData['key'], options?: TInputErrorData['options']) => void;
    blur: () => void;
  },
  resultState: R,
] => {
  const {
    onBlurChanged,
    onChanged,
    translate,
    formatter = (d: E) => d as unknown as T,
    result = (d: T) => d as unknown as R,
  } = props;
  const t: TInputTranslateFn = React.useMemo(() => translate || defaultT, [translate]);

  const [state, setState] = useStoredValue<T>(initialState);
  const [resultState, setResutlState] = useStoredValue<R>(result(state));
  const [errorData, setErrorData] = React.useState<TInputErrorData>({ key: '' });
  const [error, setError] = React.useState<string>('');
  const [changed, setChanged] = React.useState<boolean>(false);
  const blur = React.useCallback(() => {
    if (changed) {
      onBlurChanged?.();
      setChanged(false);
    }
  }, [changed, onBlurChanged]);
  const change = React.useCallback(
    (newValue: E) => {
      setState(formatter(newValue));
      setResutlState(result(formatter(newValue)));
      setChanged(true);
      setError('');
      setErrorData({ key: '' });
      onChanged?.();
    },
    [setState, formatter, setResutlState, result, onChanged],
  );
  const setData = React.useCallback((key: TInputErrorData['key'], options: TInputErrorData['options']) => {
    setErrorData({ key, options });
  }, []);
  React.useEffect(() => {
    setError(t(errorData.key, errorData.options));
  }, [errorData, t]);

  return [state, change, { error, setError: setData, blur }, resultState];
};

export default useField;
