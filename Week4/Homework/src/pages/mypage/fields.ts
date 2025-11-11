export const MYPAGE_FIELDS = [
  {
    id: "mypage-name",
    name: "name" as const,
    label: "이름",
    emptyPlaceholder: "이름을 입력하세요",
  },
  {
    id: "mypage-email",
    name: "email" as const,
    label: "이메일",
    type: "email" as const,
    emptyPlaceholder: "이메일을 입력하세요",
  },
  {
    id: "mypage-age",
    name: "age" as const,
    label: "나이",
    inputMode: "numeric" as const,
    emptyPlaceholder: "나이를 입력하세요",
  },
] as const;

export type MyPageFieldName = (typeof MYPAGE_FIELDS)[number]["name"];
