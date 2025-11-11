import { useState, type FormEvent } from "react";
import { getUserProfile, type UserProfile } from "@/api";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./MembersPage.css";

const MembersPage = () => {
  const [memberId, setMemberId] = useState("");
  const [member, setMember] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = memberId.trim().length === 0 || isLoading;

  const handleSearch = async () => {
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
    void handleSearch();
  };

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h2 className={s.title}>회원 조회</h2>
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            id="member-id"
            name="memberId"
            label="회원 ID"
            placeholder="숫자만 입력"
            inputMode="numeric"
            value={memberId}
            onChange={(event) => {
              const value = event.target.value.replace(/[^0-9]/g, "");
              setMemberId(value);
            }}
            disabled={isLoading}
          />
          <Button text="조회" type="submit" disabled={isDisabled} />
        </form>

        {member && (
          <dl className={s.result}>
            <div className={s.resultRow}>
              <dt>이름</dt>
              <dd>{member.name}</dd>
            </div>
            <div className={s.resultRow}>
              <dt>아이디</dt>
              <dd>{member.username}</dd>
            </div>
            <div className={s.resultRow}>
              <dt>이메일</dt>
              <dd>{member.email}</dd>
            </div>
            <div className={s.resultRow}>
              <dt>나이</dt>
              <dd>{member.age}</dd>
            </div>
          </dl>
        )}
      </section>
    </main>
  );
};

export default MembersPage;
