import { colorSquareType } from '@/types/colorSquare';

/**
 * @property {number} count 해당 날짜의 측정 횟수
 * @property {string} time 측정 날짜
 * @property {number|null} bloodSugarBefore 식전 혈당 평균 값
 * @property {number|null} bloodSugarAfter 식후 혈당 평균 값
 */

export interface BloodSugarResponseData {
  count: number;
  time: string;
  bloodSugarBefore: number | null;
  bloodSugarAfter: number | null;
  bloodSugarBeforeStatus: colorSquareType;
  bloodSugarAfterStatus: colorSquareType;
}

/**
 * @property {number} bloodSugarPk PK값
 * @property {'BEFORE' | 'AFTER'} category BEFORE 식전, AFTER 식후
 * @property {string | null} content 사용자의 메모
 * @property {number} level 혈당 수치
 * @property {string} updatedAt 등록 시간
 */

export interface BloodSugarDetailResponseData {
  bloodSugarPk: number;
  category: 'BEFORE' | 'AFTER';
  content: string | null;
  level: number;
  registedAt: string;
  status: colorSquareType;
}

/**
 * @property {number} bloodSugarMin 혈당 최소값
 * @property {number} bloodSugarMax 혈당 최대값
 * @property {BloodSugarDetailResponseData[]} list 혈당 상세 기록
 */

export interface BloodSugarDaliyResponseData {
  bloodSugarMin: number;
  bloodSugarMax: number;
  list: BloodSugarDaliyResponseData[];
}

/**
 * @property {boolean} success API 호출 성공 여부
 * @property {BloodSugarDaliyResponseData[]} response API 응답 데이터 배열
 * @property {any} error 에러 정보
 */

export interface BloodSugarApiResponse {
  success: boolean;
  response: BloodSugarDaliyResponseData[];
  error: any;
}

/**
 * @property {boolean} success API 호출 성공 여부
 * @property {BloodSugarDetailResponseData[]} response API 응답 데이터 배열
 * @property {any} error 에러 정보
 */

export interface BloodSugarDetailApiResponse {
  success: boolean;
  response: BloodSugarDetailResponseData;
  error: string | null;
}

/**
 * @param {string} nickname 대상자 nickname
 * @param {Date} startDate 시작 날짜
 * @param {Date} endDate 종료 날짜
 * @param {number} page 에러 정보
 */

export type periodBloodSugarProps = {
  nickname: string;
  startDate: Date;
  endDate: Date;
  page: number;
};

/**
 * @param {string} nickname 대상자 nickname
 * @param {string} year 대상 년
 * @param {string} month 월
 * @param {string} day 일
 */

export type detailBloodSugarProps = {
  nickname: string;
  year: string;
  month: string;
  day: string;
};

/**
 * @property {"BEFORE" | "AFTER"} category BEFORE 식전, AFTER 식후
 * @property {number} level 혈당 수치
 * @property {string} content 사용자의 메모
 * @property {string} registedAt 등록 시간
 */

export type BloodSugarWriteData = {
  category: 'BEFORE' | 'AFTER';
  level: number;
  content: string;
  registedAt: string;
};
