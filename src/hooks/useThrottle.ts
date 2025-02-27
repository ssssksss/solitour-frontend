import { useRef } from "react";

export const useThrottle = <T extends unknown[]>(
  callback: (...params: T) => void,
  throttleTime = 1000,
) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...params: T) => {
    if (timeout.current) {
      return;
    }

    callback(...params);

    timeout.current = setTimeout(() => {
      timeout.current = null;
    }, throttleTime);
  };
};
