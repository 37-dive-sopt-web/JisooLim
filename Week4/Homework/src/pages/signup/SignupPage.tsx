import { Link } from "react-router";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./SignupPage.css";
import useSignupForm from "./hooks/useSignupForm";

const SignupPage = () => {
  const { isFirstStep, isLastStep, disableStep, onChange, next, prev, fields } =
    useSignupForm();

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
                onClick={isLastStep ? undefined : next}
                disabled={disableStep}
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
