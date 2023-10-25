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
    font-size: 32px;
    font-weight: 600;
    line-height: 38.4px; // 32px * 1.2
  `,
  h1r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 32px;
    font-weight: normal;
    line-height: 38.4px; // 32px * 1.2
  `,
  h2b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 28px;
    font-weight: 600;
    line-height: 33.6px; // 28px * 1.2
  `,
  h2r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 28px;
    font-weight: normal;
    line-height: 33.6px; // 28px * 1.2
  `,
  h3b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 24px;
    font-weight: 600;
    line-height: 28.8px; // 24px * 1.2
  `,
  h3r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 24px;
    font-weight: normal;
    line-height: 28.8px; // 24px * 1.2
  `,
  h4b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 20px;
    font-weight: 600;
    line-height: 26px; // 20px * 1.3
  `,
  h4r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 20px;
    font-weight: normal;
    line-height: 26px; // 20px * 1.3
  `,
  p1b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 18px;
    font-weight: 600;
    line-height: 25.2px; // 18px * 1.4
  `,
  p1r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 18px;
    font-weight: normal;
    line-height: 25.2px; // 18px * 1.4
  `,
  p2b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px; // 16px * 1.4
  `,
  p2r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 16px;
    font-weight: normal;
    line-height: 22.4px; // 16px * 1.4
  `,
  p3b: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 14px;
    font-weight: 600;
    line-height: 19.6px; // 14px * 1.4
  `,
  p3r: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 14px;
    font-weight: normal;
    line-height: 19.6px; // 14px * 1.4
  `,
  captionb: css`
    font-family: ${fonts.SUIT.semibold};
    font-size: 12px;
    font-weight: 600;
    line-height: 16.8px; // 12px * 1.4
  `,
  captionr: css`
    font-family: ${fonts.SUIT.regular};
    font-size: 12px;
    font-weight: normal;
    line-height: 16.8px; // 12px * 1.4
  `,
  t1: css`
    font-family: ${fonts.JALNAN};
    font-size: 80px;
    font-weight: normal;
    line-height: 96px; // 80px * 1.2
  `,
  t3: css`
    font-family: ${fonts.JALNAN};
    font-size: 28px;
    font-weight: normal;
    line-height: 33.6px; // 28px * 1.2
  `,
} as const;

const theme: DefaultTheme = { typography, colors };

export type TypographyType = typeof typography;
export type ColorType = typeof colors;

export default theme;
