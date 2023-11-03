import React from 'react';

/** InputProps
 * @param {String} placeholder placeholder
 * @param {String} value 값
 * @param {React.Dispatch<React.SetStateAction<string>>} onChangeText 변경된 값을 상태에 저장하는 콜백함수
 * @param {String} unit Input 우측에 보여줄 값
 */

export default interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  unit?: string;
}
