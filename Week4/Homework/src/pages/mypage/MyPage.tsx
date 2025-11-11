import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import { MYPAGE_FIELDS } from "./fields";
import useMyPageForm from "./hooks/useMyPageForm";
import * as s from "./MyPage.css";

const MyPage = () => {
  const {
    profile,
    formValues,
    isLoading,
    isSaving,
    handleChange,
    handleSave,
    getPlaceholder,
  } = useMyPageForm();

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h2 className={s.title}>내 정보</h2>
        <div className={s.infoRow}>
          <span>아이디</span>
          <div className={s.name}>{profile?.username}</div>
        </div>
        {MYPAGE_FIELDS.map(({ emptyPlaceholder, ...field }) => (
          <Input
            key={field.id}
            {...field}
            value={formValues[field.name]}
            placeholder={getPlaceholder(field.name, emptyPlaceholder)}
            onChange={handleChange}
            disabled={isLoading || isSaving}
          />
        ))}
        <Button
          text="저장"
          type="button"
          onClick={handleSave}
          disabled={isLoading || isSaving}
        />
      </section>
    </main>
  );
};

export default MyPage;
