import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "@/assets/svgs";
import * as styles from "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  toggleVisibility?: boolean;
}

const Input = ({
  label,
  errorMessage,
  id,
  type = "text",
  toggleVisibility = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const shouldToggle = toggleVisibility && isPasswordField;
  const inputType = shouldToggle && showPassword ? "text" : type;
  const inputClassName = shouldToggle ? styles.inputWithToggle : styles.input;

  return (
    <label className={styles.container} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <div className={styles.inputWrapper}>
        <input className={inputClassName} id={id} type={inputType} {...props} />
        {shouldToggle && (
          <button
            type="button"
            className={styles.toggleButton}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff width={20} height={20} />
            ) : (
              <Eye width={20} height={20} />
            )}
          </button>
        )}
      </div>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </label>
  );
};

export default Input;
