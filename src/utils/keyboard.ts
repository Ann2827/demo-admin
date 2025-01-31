export const listenKeydown = (
  code: string,
  callback: (...args: any) => void | Promise<void>,
  disabled?: boolean,
): (() => void) => {
  const fn = (event: KeyboardEvent) => {
    if (event.code == code && !disabled) {
      callback();
    }
  };
  document.addEventListener('keydown', fn);
  return () => {
    document.removeEventListener('keydown', fn);
  };
};
