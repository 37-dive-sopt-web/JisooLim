import { Link } from "react-router";
import Button from "@/shared/components/button/Button";
import * as s from "./LoginPage.css";

function LoginPage() {
  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>로그인</h1>
        <form className={s.form}>
          <label className={s.label} htmlFor="login-id">
            아이디
            <input
              className={s.input}
              id="login-id"
              name="id"
              type="text"
              placeholder="아이디를 입력하세요"
            />
          </label>
          <label className={s.label} htmlFor="login-password">
            비밀번호
            <input
              className={s.input}
              id="login-password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </label>
        </form>
        <Button text="로그인" />
        <Link className={s.signup} to="/signup">
          회원가입
        </Link>
      </section>
    </main>
  );
}

export default LoginPage;
