import { useState } from "react";
import Button from "@/shared/components/button/Button";
import * as s from "./SignupPage.css";

type Step = "info" | "password";

function SignupPage() {
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
              <div className={s.field}>
                <label className={s.label} htmlFor="signup-name">
                  이름
                </label>
                <input
                  className={s.input}
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="signup-email">
                  이메일
                </label>
                <input
                  className={s.input}
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="signup-age">
                  나이
                </label>
                <input
                  className={s.input}
                  id="signup-age"
                  name="age"
                  type="number"
                  min="0"
                  placeholder="나이를 입력하세요"
                />
              </div>
            </>
          )}

          {step === "password" && (
            <>
              <div className={s.field}>
                <label className={s.label} htmlFor="signup-password">
                  비밀번호
                </label>
                <input
                  className={s.input}
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="signup-password-confirm">
                  비밀번호 확인
                </label>
                <input
                  className={s.input}
                  id="signup-password-confirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="다시 한 번 입력하세요"
                />
              </div>
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
}

export default SignupPage;
