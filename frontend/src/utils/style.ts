import {
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const basicDimensions = {
  width: 390,
  height: 844,
};

const rWidth = (basicWidth: number): number => {
  const widthPercentage = (basicWidth / basicDimensions.width) * 100;
  return responsiveScreenWidth(widthPercentage);
};

const rHeight = (basicHeight: number): number => {
  const heightPercentage = (basicHeight / basicDimensions.width) * 100;
  return responsiveScreenWidth(heightPercentage);
};

const rFontSize = (basicsize: number): number => {
  const percentage = basicsize * 0.135;

  return responsiveScreenFontSize(percentage);
};

export { rWidth, rHeight, rFontSize };
