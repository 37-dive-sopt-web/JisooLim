import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import { MEMBER_RESULT_FIELDS } from "./fields";
import useMemberSearch from "./hooks/useMemberSearch";
import * as s from "./MembersPage.css";

const MembersPage = () => {
  const {
    memberId,
    member,
    isLoading,
    isDisabled,
    handleInputChange,
    handleSubmit,
  } = useMemberSearch();

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
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button text="조회" type="submit" disabled={isDisabled} />
        </form>

        {member && (
          <dl className={s.result}>
            {MEMBER_RESULT_FIELDS.map(({ label, key }) => (
              <div className={s.resultRow} key={key as string}>
                <dt>{label}</dt>
                <dd>{member[key]}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </main>
  );
};

export default MembersPage;
