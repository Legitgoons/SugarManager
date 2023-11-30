const validationErrorConfig = {
  common: '입력창에 내용을 제대로 입력해주세요',
  id: '아이디는 영문, 소문자, 숫자 가능, 특수문자 불가능하며 6자 이상 320자 이하입니다.',
  pw: '비밀번호는 영문, 대문자, 소문자, 숫자, 특수 문자가 포함되며 8자 이상 20자 이하입니다.',
  nickname: '닉네임은 영문, 숫자, 한글이 가능한 6자 이상으로 입력해야 합니다.',
  bloodSugar: '혈당은 0 이상 999 이하의 수치를 입력해야 합니다.',
};

const alertConfig = {
  normalFail: {
    title: (subject: string) => `${subject} 실패`,
    content: '다시 시도해주세요.',
  },
  normalSuccess: {
    title: (subject: string) => `${subject} 성공`,
    content: (subject: string) => `${subject}에 성공하였습니다.`,
  },
  validationFail: {
    title: (subject: string) => `${subject} 오류`,
    content: (subject: keyof typeof validationErrorConfig) =>
      validationErrorConfig[subject],
  },
};

export default alertConfig;
