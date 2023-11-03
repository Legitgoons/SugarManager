import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const basicDimensions = {
  width: 390,
  height: 844,
};

const rWidth = (basicwidth: number): number => {
  const percentage = (basicwidth / basicDimensions.width) * 100;

  return responsiveScreenWidth(percentage);
};

const rHeight = (basicheight: number): number => {
  const percentage = (basicheight / basicDimensions.height) * 100;

  return responsiveScreenHeight(percentage);
};

const rFontSize = (basicsize: number): number => {
  const percentage = basicsize * 0.135;

  return responsiveScreenFontSize(percentage);
};

export { rWidth, rHeight, rFontSize };
