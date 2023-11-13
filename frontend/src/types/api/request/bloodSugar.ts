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
}

/**
 * @property {boolean} success API 호출 성공 여부
 * @property {BloodSugarResponseData[]} response API 응답 데이터 배열
 * @property {any} error 에러 정보
 */

export interface BloodSugarApiResponse {
  success: boolean;
  response: BloodSugarResponseData[];
  error: any;
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
 * @property {"BEFORE" | "AFTER"} category BEFORE 식전, AFTER 식후
 * @property {number} level 혈당 수치
 * @property {string} content 사용자의 메모
 */

export type BloodSugarWriteData = {
  category: 'BEFORE' | 'AFTER';
  level: number;
  content: string;
};
