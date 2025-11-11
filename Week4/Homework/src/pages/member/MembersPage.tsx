import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./MembersPage.css";

const MembersPage = () => {
  const [memberId, setMemberId] = useState("");
  const isDisabled = memberId.trim().length === 0;

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h2 className={s.title}>회원 조회</h2>
        <Input
          id="member-id"
          name="memberId"
          label="회원 ID"
          placeholder="숫자만 입력"
          inputMode="numeric"
          value={memberId}
          onChange={(event) => setMemberId(event.target.value)}
        />
        <Button text="조회" type="button" disabled={isDisabled} />
      </section>
    </main>
  );
};

export default MembersPage;
