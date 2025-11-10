import * as styles from "./Button.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ text, type = "button", onClick, disabled }: ButtonProps) {
  return (
    <button
      className={styles.buttonContainer}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
