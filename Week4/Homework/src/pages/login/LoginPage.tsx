import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "@/api";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = username.trim() === "" || password.trim() === "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { userId } = await login({ username, password });
      window.localStorage.setItem("userId", String(userId));
      navigate("/mypage");
    } catch (error) {
      const message = error instanceof Error ? error.message : "로그인 실패 😞";
      alert(message);
    }
  };

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>로그인</h1>
        <form className={s.form} onSubmit={handleSubmit}>
          <Input
            id="login-id"
            name="username"
            label="아이디"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />
          <Input
            id="login-password"
            name="password"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            toggleVisibility
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
          <Button text="로그인" type="submit" disabled={isDisabled} />
        </form>
        <Link className={s.signup} to="/signup">
          회원가입
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
