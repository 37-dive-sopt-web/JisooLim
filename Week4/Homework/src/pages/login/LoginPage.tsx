import { Link } from "react-router";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./LoginPage.css";

const LoginPage = () => {
  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>로그인</h1>
        <form className={s.form}>
          <Input
            id="login-id"
            name="id"
            label="아이디"
            placeholder="아이디를 입력하세요"
          />
          <Input
            id="login-password"
            name="password"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            toggleVisibility
          />
        </form>
        <Button text="로그인" type="submit" />
        <Link className={s.signup} to="/signup">
          회원가입
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
