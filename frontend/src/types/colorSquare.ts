export type ColorSquareType = 'SAFETY' | 'WARNING' | 'DANGER';

/** ColorSquareProps
 * @param {number} num 혈당 수치
 * @param {ColorSquareType} type 혈당 위험도 상태
 */

export interface ColorSquareProps {
  num: number;
  type: ColorSquareType;
}
