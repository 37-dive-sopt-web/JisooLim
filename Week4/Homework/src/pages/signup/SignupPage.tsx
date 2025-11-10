import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./SignupPage.css";

type Step = "info" | "password";

const SignupPage = () => {
  const [step, setStep] = useState<Step>("info");
  const handleNext = () => setStep("password");
  const handlePrev = () => setStep("info");

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>회원가입</h1>
        <form className={s.form}>
          {step === "info" && (
            <>
              <Input
                id="signup-name"
                name="name"
                label="이름"
                placeholder="이름을 입력하세요"
              />
              <Input
                id="signup-email"
                name="email"
                type="email"
                label="이메일"
                placeholder="example@email.com"
              />
              <Input
                id="signup-age"
                name="age"
                type="number"
                min="0"
                label="나이"
                placeholder="나이를 입력하세요"
              />
            </>
          )}

          {step === "password" && (
            <>
              <Input
                id="signup-password"
                name="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                toggleVisibility
              />
              <Input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                label="비밀번호 확인"
                placeholder="다시 한 번 입력하세요"
                toggleVisibility
              />
            </>
          )}

          {step === "info" ? (
            <div className={s.singleAction}>
              <Button text="다음" type="button" onClick={handleNext} />
            </div>
          ) : (
            <div className={s.actions}>
              <div className={s.actionButton}>
                <Button text="이전" type="button" onClick={handlePrev} />
              </div>
              <div className={s.actionButton}>
                <Button text="가입 완료" type="button" />
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default SignupPage;
