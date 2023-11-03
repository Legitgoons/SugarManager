import 'styled-components/native';
import { ColorType, TypographyType } from '@/styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: { [key in keyof ColorType]: ColorType[key] };
    typographys: { [key in keyof TypographyType]: TypographyType[key] };
  }
}
