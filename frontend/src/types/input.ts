import React from 'react';
import { KeyboardTypeOptions } from 'react-native';

/** DefaultInputProps
 * @param {String} placeholder placeholder
 * @param {String} value 값
 * @param {React.Dispatch<React.SetStateAction<string>>} onChangeText 변경된 값을 상태에 저장하는 콜백함수
 * @param {String} unit Input 우측에 보여줄 값
 * @param {number} maxLength Input text의 최대 길이
 * @param {KeyboardTypeOptions} keyboardType input text의 기본 타입
 * @param {boolean} editable input 입력 가능 여부
 */

export default interface DefaultInputProps<T extends string | number> {
  placeholder: string;
  value: T;
  onChangeText?: React.Dispatch<React.SetStateAction<T>>;
  unit?: string;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions | undefined;
  editable?: boolean;
}
