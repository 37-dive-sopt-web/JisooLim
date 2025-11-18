export const LOGIN_FIELDS = [
  {
    id: "login-id",
    name: "username" as const,
    label: "아이디",
    placeholder: "아이디를 입력하세요",
    autoComplete: "username",
  },
  {
    id: "login-password",
    name: "password" as const,
    type: "password",
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    toggleVisibility: true,
    autoComplete: "current-password",
  },
] as const;
