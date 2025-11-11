import type { UserProfile } from "@/api";

export const MEMBER_RESULT_FIELDS: Array<{
  label: string;
  key: keyof Pick<UserProfile, "name" | "username" | "email" | "age">;
}> = [
  { label: "이름", key: "name" },
  { label: "아이디", key: "username" },
  { label: "이메일", key: "email" },
  { label: "나이", key: "age" },
];
