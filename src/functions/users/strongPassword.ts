export const strongPassword = (
  firstName: string,
  lastName: string,
  nickname: string,
  email: string,
  password: string
) => {
  const strongPassword =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  const passwordLowerCase = password.toLowerCase();
  const firstNameLowerCase = firstName.toLowerCase();
  const lastNameLowerCase = lastName.toLowerCase();
  const nicknameLowerCase = nickname.toLowerCase();
  const emailLowerCase = email.toLowerCase();

  if (
    !strongPassword.test(password) ||
    passwordLowerCase.includes(firstNameLowerCase) ||
    passwordLowerCase.includes(lastNameLowerCase) ||
    passwordLowerCase.includes(nicknameLowerCase) ||
    passwordLowerCase.includes(emailLowerCase)
  ) {
    return false;
  }
  return true;
};
