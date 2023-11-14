export type colorSquareType = 'SAFETY' | 'WARNING' | 'DANGER';

export interface ColorSquareProps {
  num: number;
  type: colorSquareType;
}
