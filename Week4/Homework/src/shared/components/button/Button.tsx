import type { ButtonHTMLAttributes } from "react";
import * as styles from "./Button.css";

type ButtonTone = "primary" | "secondary" | "danger";
type ButtonSize = "medium" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  text,
  type = "button",
  tone = "primary",
  size = "medium",
  fullWidth = true,
  className,
  ...rest
}: ButtonProps) => {
  const composedClassName = [
    styles.buttonContainer,
    styles.sizeVariants[size],
    styles.toneVariants[tone],
    fullWidth ? styles.fullWidth : undefined,
    className,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return (
    <button className={composedClassName} type={type} {...rest}>
      {text}
    </button>
  );
};

export default Button;
