import { useState } from "react";
import Button from "@/shared/components/button/Button";
import Input, { type InputProps } from "@/shared/components/input/Input";
import * as s from "./SignupPage.css";

type StepId = "info" | "password";

interface StepDefinition {
  id: StepId;
  fields: InputProps[];
}

const STEP_FLOW: StepDefinition[] = [
  {
    id: "info",
    fields: [
      {
        id: "signup-name",
        name: "name",
        label: "이름",
        placeholder: "이름을 입력하세요",
      },
      {
        id: "signup-email",
        name: "email",
        type: "email",
        label: "이메일",
        placeholder: "example@email.com",
      },
      {
        id: "signup-age",
        name: "age",
        type: "number",
        min: 0,
        label: "나이",
        placeholder: "나이를 입력하세요",
      },
    ],
  },
  {
    id: "password",
    fields: [
      {
        id: "signup-password",
        name: "password",
        type: "password",
        label: "비밀번호",
        placeholder: "비밀번호를 입력하세요",
        toggleVisibility: true,
      },
      {
        id: "signup-password-confirm",
        name: "passwordConfirm",
        type: "password",
        label: "비밀번호 확인",
        placeholder: "다시 한 번 입력하세요",
        toggleVisibility: true,
      },
    ],
  },
];

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

          {isFirstStep ? (
            <div className={s.singleAction}>
              <Button text="다음" type="button" onClick={goToNextStep} />
            </div>
          ) : (
            <div className={s.actions}>
              <div className={s.actionButton}>
                <Button text="이전" type="button" onClick={goToPreviousStep} />
              </div>
              <div className={s.actionButton}>
                <Button
                  text={isLastStep ? "가입 완료" : "다음"}
                  type="button"
                  onClick={isLastStep ? undefined : goToNextStep}
                />
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default SignupPage;
