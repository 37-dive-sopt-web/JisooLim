import { useState, type ChangeEvent, type FormEvent } from "react";
import { getUserProfile, type UserProfile } from "@/api";
import useApiRequest from "@/shared/hooks/useApiRequest";

const useMemberSearch = () => {
  const [memberId, setMemberId] = useState("");
  const [member, setMember] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = memberId.trim().length === 0 || isLoading;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setMemberId(value);
  };

  const { execute: fetchMember } = useApiRequest(getUserProfile, {
    defaultErrorMessage: "회원 정보를 찾지 못했습니다.",
  });

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
      const data = await fetchMember(numericId);
      setMember(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "회원 정보를 찾지 못했습니다.";
      alert(message);
      setMember(null);
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
