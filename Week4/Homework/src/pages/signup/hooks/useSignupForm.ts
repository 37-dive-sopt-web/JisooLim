import { useState } from "react";
import { STEP_FLOW } from "../flow";
import {
  getIdErrorMessage,
  getPasswordRuleErrors,
  isIdValid,
  isPasswordPolicyValid,
} from "@/shared/utils/authValidation";

type Step = (typeof STEP_FLOW)[number];
type StepField = Step["fields"][number];

interface FormValues {
  id?: string;
  password?: string;
  passwordConfirm?: string;
  name?: string;
  email?: string;
  age?: string;
}

type FieldName = keyof FormValues;

const isFieldKey = (n: StepField["name"]): n is FieldName =>
  n === "id" ||
  n === "password" ||
  n === "passwordConfirm" ||
  n === "name" ||
  n === "email" ||
  n === "age";

const PASSWORD_STEP_ID = "password";
const ACCOUNT_STEP_ID = "account";

const useSignupForm = () => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({});

  const currentStep = STEP_FLOW[step];
  const isFirstStep = step === 0;
  const isLastStep = step === STEP_FLOW.length - 1;

  const id = formValues.id ?? "";
  const password = formValues.password ?? "";
  const passwordConfirm = formValues.passwordConfirm ?? "";

  const name = formValues.name ?? "";
  const email = formValues.email ?? "";
  const age = formValues.age ?? "";

  const pwErrors = getPasswordRuleErrors(password);
  const pwPolicyError = password ? pwErrors[0] : undefined;
  const pwMatch = password && passwordConfirm ? password === passwordConfirm : false;
  const pwMismatchError =
    password && passwordConfirm && !pwMatch
      ? "비밀번호가 일치하지 않습니다."
      : undefined;

  const disablePwStep =
    currentStep.id === PASSWORD_STEP_ID &&
    (!password || !passwordConfirm || !isPasswordPolicyValid(password) || !pwMatch);

  const disableIdStep = currentStep.id === ACCOUNT_STEP_ID && !isIdValid(id);

  const disableProfileStep =
    currentStep.id === "profile" &&
    (!name.trim() || !email.trim() || !age.trim());

  const disableStep = disablePwStep || disableIdStep || disableProfileStep;

  const onChange = (name: FieldName | undefined, value: string) => {
    if (!name) return;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getErrMsg = (name: FieldName | undefined) => {
    if (!name) return undefined;
    if (name === "password") return pwPolicyError;
    if (name === "passwordConfirm") return pwMismatchError;
    if (name === "id") return getIdErrorMessage(formValues.id ?? "");
    return undefined;
  };

  const fields = currentStep.fields.map((field) => {
    const key = isFieldKey(field.name) ? field.name : undefined;
    return {
      ...field,
      name: key,
      value: key ? formValues[key] ?? "" : undefined,
      errorMessage: getErrMsg(key),
    };
  });

  const next = () => {
    if (!isLastStep) {
      setStep((prev) => Math.min(prev + 1, STEP_FLOW.length - 1));
    }
  };

  const prev = () => {
    if (!isFirstStep) {
      setStep((prev) => Math.max(prev - 1, 0));
    }
  };

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    disableStep,
    formValues,
    fields,
    onChange,
    next,
    prev,
  };
};

export default useSignupForm;
