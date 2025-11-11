import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./MembersPage.css";

const MembersPage = () => {
  return (
    <main className={s.page}>
      <section className={s.box}>
        <h2 className={s.title}>회원 조회</h2>
        <Input
          id="number"
          name="number"
          label="회원 ID"
          placeholder="숫자만 입력"
        />
        <Button text="조회" type="button" />
      </section>
    </main>
  );
};

export default MembersPage;
