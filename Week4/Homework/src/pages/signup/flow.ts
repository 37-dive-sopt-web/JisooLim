import type { InputProps } from "@/shared/components/input/Input";

export type StepId = "account" | "password" | "profile";

export interface StepDefinition {
  id: StepId;
  fields: InputProps[];
}

export const STEP_FLOW: StepDefinition[] = [
  {
    id: "account",
    fields: [
      {
        id: "signup-id",
        name: "id",
        label: "아이디",
        placeholder: "아이디를 입력하세요",
      },
    ],
  },
  {
    id: "password",
    fields: [
      {
        id: "signup-password",
        name: "password",
        type: "password",
        label: "비밀번호",
        placeholder: "비밀번호를 입력하세요",
        toggleVisibility: true,
      },
      {
        id: "signup-password-confirm",
        name: "passwordConfirm",
        type: "password",
        label: "비밀번호 확인",
        placeholder: "다시 한 번 입력하세요",
        toggleVisibility: true,
      },
    ],
  },
  {
    id: "profile",
    fields: [
      {
        id: "signup-name",
        name: "name",
        label: "이름",
        placeholder: "이름을 입력하세요",
      },
      {
        id: "signup-email",
        name: "email",
        type: "email",
        label: "이메일",
        placeholder: "example@email.com",
      },
      {
        id: "signup-age",
        name: "age",
        type: "number",
        min: 0,
        label: "나이",
        placeholder: "나이를 입력하세요",
      },
    ],
  },
];
