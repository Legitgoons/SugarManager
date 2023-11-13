export type colorSquareType = 'safety' | 'warning' | 'danger';

export interface ColorSquareProps {
  num: number;
  type: colorSquareType;
}
