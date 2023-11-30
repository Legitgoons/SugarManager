/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

interface UseDebounceEffectProps {
  delay: number;
  dependencyList: any[];
  fn: () => void;
}

export default function useDebounceEffect({
  delay,
  dependencyList,
  fn,
}: UseDebounceEffectProps) {
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      fn();
    }, delay);

    return () => {
      clearTimeout(debounceFn);
    };
  }, [...dependencyList, delay, fn]);
}
