import { useState } from "react";
import { Link } from "react-router";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import { STEP_FLOW } from "./flow";
import * as s from "./SignupPage.css";

const SignupPage = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = STEP_FLOW[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === STEP_FLOW.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setStepIndex((prev) => Math.min(prev + 1, STEP_FLOW.length - 1));
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setStepIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h1 className={s.title}>회원가입</h1>

        <form className={s.form}>
          {currentStep.fields.map((field) => (
            <Input key={field.id} {...field} />
          ))}

          <div className={isFirstStep ? s.singleAction : s.actions}>
            {!isFirstStep && (
              <div className={s.actionButton}>
                <Button text="이전" type="button" onClick={goToPreviousStep} />
              </div>
            )}
            <div className={s.actionButton}>
              <Button
                text={isLastStep ? "가입 완료" : "다음"}
                type="button"
                onClick={isLastStep ? undefined : goToNextStep}
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
