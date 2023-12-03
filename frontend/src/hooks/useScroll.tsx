import React, { useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export default function useScroll() {
  const [isTop, setIsTop] = useState(true);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    isEnd: boolean,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const { nativeEvent } = event;
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const isScrolledToTop = contentOffset.y === 0;
    const isScrolledToBottom =
      Math.round(contentOffset.y + layoutMeasurement.height) >=
      Math.round(contentSize.height);
    setIsTop(isScrolledToTop);
    if (isScrolledToBottom && !isEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { isTop, handleScroll };
}
