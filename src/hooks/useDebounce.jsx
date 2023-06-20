import { useCallback, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const timer = useRef(null);

  const debounceCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCallback;
};

export default useDebounce;
