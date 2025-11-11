import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signup } from "@/api";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./SignupPage.css";
import useSignupForm from "./hooks/useSignupForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    isFirstStep,
    isLastStep,
    disableStep,
    onChange,
    next,
    prev,
    fields,
    formValues,
  } = useSignupForm();

  const handleSignup = async () => {
    if (isSubmitting) return;
    const username = formValues.id?.trim() ?? "";
    const password = formValues.password ?? "";
    const name = formValues.name?.trim() ?? "";
    const email = formValues.email?.trim() ?? "";
    const ageInput = formValues.age?.trim() ?? "";
    const ageValue = Number(ageInput);

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !ageInput ||
      Number.isNaN(ageValue)
    ) {
      alert("모든 필드를 올바르게 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({ username, password, name, email, age: ageValue });
      alert(`${name}님 반갑습니다!`);
      navigate("/");
    } catch (error) {
      if (error instanceof Error && error.message === "이미 존재하는 사용자명입니다.") {
        alert(error.message);
      } else {
        alert("회원가입에 실패했어요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    if (isLastStep) {
      void handleSignup();
    } else {
      next();
    }
  };

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>회원가입</h1>

        <form className={s.form}>
          {fields.map((field) => (
            <Input
              key={field.id}
              {...field}
              onChange={(event) => onChange(field.name, event.target.value)}
            />
          ))}

          <div className={isFirstStep ? s.singleAction : s.actions}>
            {!isFirstStep && (
              <div className={s.actionButton}>
                <Button text="이전" type="button" onClick={prev} />
              </div>
            )}
            <div className={s.actionButton}>
              <Button
                text={isLastStep ? "가입 완료" : "다음"}
                type="button"
                onClick={handleFinish}
                disabled={disableStep || isSubmitting}
              />
            </div>
          </div>
        </form>
        <p className={s.back}>
          이미 계정이 있나요?
          <Link className={s.backLink} to="/">
            {" "}
            로그인하러 가기
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignupPage;
