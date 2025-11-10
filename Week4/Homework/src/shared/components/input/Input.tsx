import type { InputHTMLAttributes } from "react";
import * as styles from "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const Input = ({
  label,
  errorMessage,
  id,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <label className={styles.container} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} id={id} type={type} {...props} />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </label>
  );
};

export default Input;
