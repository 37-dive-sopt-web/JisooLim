import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ApiError, login } from "@/api";
import { STORAGE_KEYS } from "@/shared/constants/storage";
import { ROUTES } from "@/shared/constants/routes";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./LoginPage.css";
import { LOGIN_FIELDS } from "./fields";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const isDisabled =
    formValues.username.trim() === "" || formValues.password.trim() === "";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { userId } = await login(formValues);

      if (typeof userId !== "number") {
        throw new Error("사용자 정보를 불러오지 못했어요");
      }

      window.localStorage.setItem(STORAGE_KEYS.userId, String(userId));
      navigate(ROUTES.myPage.path);
    } catch (error) {
      if (error instanceof ApiError) {
        alert(error.message);
        return;
      }
      const message = error instanceof Error ? error.message : "로그인 실패 😞";
      alert(message);
    }
  };

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>로그인</h1>
        <form className={s.form} onSubmit={handleSubmit}>
          {LOGIN_FIELDS.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={formValues[input.name as keyof LoginForm]}
              onChange={handleChange}
            />
          ))}
          <Button text="로그인" type="submit" disabled={isDisabled} />
        </form>
        <Link className={s.signup} to={ROUTES.signup.path}>
          회원가입
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
