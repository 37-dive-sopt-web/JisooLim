import { useState, type ChangeEvent, type FormEvent } from "react";
import { getUserProfile, type UserProfile } from "@/api";

const useMemberSearch = () => {
  const [memberId, setMemberId] = useState("");
  const [member, setMember] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = memberId.trim().length === 0 || isLoading;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setMemberId(value);
  };

  const searchMember = async () => {
    const trimmed = memberId.trim();
    if (!trimmed) return;
    const numericId = Number(trimmed);
    if (Number.isNaN(numericId)) {
      alert("숫자만 입력해 주세요.");
      return;
    }
    try {
      setIsLoading(true);
      const data = await getUserProfile(numericId);
      setMember(data);
    } catch (error) {
      setMember(null);
      const message =
        error instanceof Error ? error.message : "회원 정보를 찾지 못했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void searchMember();
  };

  return {
    memberId,
    member,
    isLoading,
    isDisabled,
    handleInputChange,
    handleSubmit,
  } as const;
};

export default useMemberSearch;
