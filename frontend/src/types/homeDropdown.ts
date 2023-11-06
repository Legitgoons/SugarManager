import { HomeDropdownParam } from '@/types/navigation';

/** DropdownItem의 type
 * @param {String} name Dropdown Item의 이름
 * @param {keyof HomeDropdownParam} link 클릭 시 이동될 경로
 */

export interface DropdownItem {
  name: string;
  link: keyof HomeDropdownParam;
}
