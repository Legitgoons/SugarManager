import { rFontSize } from '@/utils/style';
import { DefaultTheme, css } from 'styled-components/native';

const fonts = {
  SUIT: {
    semibold: 'SUIT-SemiBold',
    regular: 'SUIT-Regular',
  },
  JALNAN: 'Jalnan',
};

const colors = {
  b1: '#e9f4ff',
  b2: '#deefff',
  b3: '#badeff',
  b4: '#2093fe',
  b5: '#1d84e5',
  b6: '#1a76cb',
  b7: '#186ebf',
  b8: '#135898',
  b9: '#0e4272',
  b10: '#0b3359',
  primary: '#545F71',
  secondary: '#9BA5B7',
  tertiary: '#EEF1F4',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F9FAFC',
  red: '#FF6B6B',
  yellow: '#FFD382',
  green: '#AED581',
} as const;
const typography = {
  h1b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(32)}px;
    font-weight: 600;
    line-height: ${rFontSize(38.4)}px;
  `,
  h1r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(32)}px;
    font-weight: normal;
    line-height: ${rFontSize(38.4)}px;
  `,
  h2b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(28)}px;
    font-weight: 600;
    line-height: ${rFontSize(33.6)}px;
  `,
  h2r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(28)}px;
    font-weight: normal;
    line-height: ${rFontSize(33.6)}px;
  `,
  h3b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(24)}px;
    font-weight: 600;
    line-height: ${rFontSize(28.8)}px;
  `,
  h3r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(24)}px;
    font-weight: normal;
    line-height: ${rFontSize(28.8)}px;
  `,
  h4b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(20)}px;
    font-weight: 600;
    line-height: ${rFontSize(26)}px;
  `,
  h4r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(20)}px;
    font-weight: normal;
    line-height: ${rFontSize(26)}px;
  `,
  p1b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(18)}px;
    font-weight: 600;
    line-height: ${rFontSize(25.2)}px;
  `,
  p1r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(18)}px;
    font-weight: normal;
    line-height: ${rFontSize(25.2)}px;
  `,
  p2b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(16)}px;
    font-weight: 600;
    line-height: ${rFontSize(22.4)}px;
  `,
  p2r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(16)}px;
    font-weight: normal;
    line-height: ${rFontSize(22.4)}px;
  `,
  p3b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(14)}px;
    font-weight: 600;
    line-height: ${rFontSize(19.6)}px;
  `,
  p3r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(14)}px;
    font-weight: normal;
    line-height: ${rFontSize(19.6)}px;
  `,
  captionb: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: ${rFontSize(12)}px;
    font-weight: 600;
    line-height: ${rFontSize(16.8)}px;
  `,
  captionr: css`
    font-family: ${fonts.SUIT.regular};
    font-size: ${rFontSize(12)}px;
    font-weight: normal;
    line-height: ${rFontSize(16.8)}px;
  `,
  t1: css`
    font-family: ${fonts.JALNAN};
    font-size: ${rFontSize(80)}px;
    font-weight: normal;
    line-height: ${rFontSize(96)}px;
  `,
  t3: css`
    font-family: ${fonts.JALNAN};
    font-size: ${rFontSize(28)}px;
    font-weight: normal;
    line-height: ${rFontSize(33.6)}px;
  `,
} as const;
const theme: DefaultTheme = { typography, colors };

export type TypographyType = typeof typography;
export type ColorType = typeof colors;

export default theme;
