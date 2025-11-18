// 아이디 유효성 검사
export const MAX_ID_LENGTH = 50;

export const getIdErrorMessage = (id: string): string | undefined => {
  if (!id) return undefined;
  if (id.length > MAX_ID_LENGTH)
    return `아이디는 ${MAX_ID_LENGTH}자 이하로 입력해주세요.`;
  return undefined;
};

export const isIdValid = (id: string): boolean => {
  if (!id) return false;
  return !getIdErrorMessage(id);
};

// 비밀번호 유효성 검사
interface PasswordRule {
  id: string;
  message: string;
  validate: (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    message: "비밀번호는 8자 이상 64자 이하로 입력해야 합니다.",
    validate: (password) => password.length >= 8 && password.length <= 64,
  },
  {
    id: "uppercase",
    message: "대문자를 최소 1자 포함해야 합니다.",
    validate: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    message: "소문자를 최소 1자 포함해야 합니다.",
    validate: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    message: "숫자를 최소 1자 포함해야 합니다.",
    validate: (password) => /\d/.test(password),
  },
  {
    id: "special",
    message: "특수문자를 최소 1자 포함해야 합니다.",
    validate: (password) => /[^A-Za-z0-9]/.test(password),
  },
  {
    id: "whitespace",
    message: "공백을 포함할 수 없습니다.",
    validate: (password) => !/\s/.test(password),
  },
];

export const getPasswordRuleErrors = (password: string): string[] => {
  if (!password) return [];

  return PASSWORD_RULES.filter((rule) => !rule.validate(password)).map(
    (rule) => rule.message
  );
};

export const isPasswordPolicyValid = (password: string): boolean => {
  return password ? getPasswordRuleErrors(password).length === 0 : false;
};
