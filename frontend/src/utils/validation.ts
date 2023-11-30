function validationId(id: string) {
  const regex = /^[a-zA-Z0-9]{6,320}$/;
  return regex.test(id);
}

function validationPw(pw: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/;
  return regex.test(pw);
}

function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export { validateEmail, validationPw, validationId };
