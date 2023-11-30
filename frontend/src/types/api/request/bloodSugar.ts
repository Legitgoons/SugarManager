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
