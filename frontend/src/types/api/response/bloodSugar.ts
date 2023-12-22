import { ColorSquareType } from '@/types/colorSquare';
import { BloodSugarCategory } from '@/types/bloodSugar';
/**
 * @property {number} count 해당 날짜의 측정 횟수
 * @property {string} time 측정 날짜
 * @property {number|null} bloodSugarBefore 식전 혈당 평균 값
 * @property {number|null} bloodSugarAfter 식후 혈당 평균 값
 */

export interface BloodSugarPeriodResponseData {
  count: number;
  time: string;
  bloodSugarBefore: number | null;
  bloodSugarAfter: number | null;
  bloodSugarBeforeStatus: ColorSquareType;
  bloodSugarAfterStatus: ColorSquareType;
}

/**
 * @property {boolean} success API 호출 성공 여부
 * @property {BloodSugarPeriodResponseData[]} response API 응답 데이터 배열
 * @property {any} error 에러 정보
 */

export interface BloodSugarPeriodApiResponse {
  success: boolean;
  response: BloodSugarPeriodResponseData[];
  error: string | null;
}

/**
 * @property {number} bloodSugarPk PK값
 * @property {BloodSugarCategory} category BEFORE 식전, AFTER 식후
 * @property {string | null} content 사용자의 메모
 * @property {number} level 혈당 수치
 * @property {string} updatedAt 등록 시간
 */

export interface BloodSugarDetailResponseDataList {
  bloodSugarPk: number;
  category: BloodSugarCategory;
  content: string | null;
  level: number;
  registedAt: string;
  status: ColorSquareType;
}

/**
 * @property {number} bloodSugarMin 혈당 최소값
 * @property {number} bloodSugarMax 혈당 최대값
 * @property {BloodSugarDetailResponseDataList[]} list 혈당 상세 기록
 */

export interface BloodSugarDetailResponseData {
  bloodSugarMin: number;
  bloodSugarMax: number;
  list: BloodSugarDetailResponseDataList[];
}

/**
 * @property {boolean} success API 호출 성공 여부
 * @property {BloodSugarDaliyResponseData[]} response API 응답 데이터 배열
 * @property {any} error 에러 정보
 */

export interface BloodSugarApiResponse {
  success: boolean;
  response: BloodSugarDetailResponseData[];
  error: string | null;
}
