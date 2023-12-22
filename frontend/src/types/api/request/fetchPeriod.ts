/**
 * @param {string} nickname 대상자 nickname
 * @param {Date} startDate 시작 날짜
 * @param {Date} endDate 종료 날짜
 * @param {number} page 에러 정보
 */

export interface PeriodProps {
  nickname: string;
  startDate: Date;
  endDate: Date;
  page: number;
}

/**
 * @param {string} nickname 대상자 nickname
 * @param {string} year 대상 년
 * @param {string} month 월
 * @param {string} day 일
 */

export interface DailyProps {
  nickname: string;
  year: string;
  month: string;
  day: string;
}
