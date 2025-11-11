import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./MyPage.css";

const MyPage = () => {
  return (
    <main className={s.page}>
      <section className={s.box}>
        <h2 className={s.title}>내 정보</h2>
        <div className={s.infoRow}>
          <span>아이디</span>
          <div className={s.name}>ooo</div>
        </div>
        <Input id="name" name="name" label="이름" placeholder="ooo" />
        <Input
          id="email"
          name="email"
          label="이메일"
          placeholder="ooo@naver.com"
        />
        <Input id="age" name="age" label="나이" placeholder="20" />
        <Button text="저장" type="button" />
      </section>
    </main>
  );
};

export default MyPage;
