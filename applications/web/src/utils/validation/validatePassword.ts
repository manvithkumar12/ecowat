export const validatePassword = (pwd: string): string[] => {
  const errors: string[] = [];
  if (pwd.length < 6) errors.push("At least 6 characters");
  if (!/[A-Z]/.test(pwd)) errors.push("At least 1 uppercase letter");
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd))
    errors.push("At least 1 special character");
  return errors;
};

export const isPasswordValid = (pwd: string): boolean => {
  return validatePassword(pwd).length === 0;
};
