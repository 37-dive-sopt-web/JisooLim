import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token/color.css";

export const buttonContainer = style({
  width: "100%",
  border: "none",
  borderRadius: "5px",
  backgroundColor: colors.blue01,
  color: colors.white01,
  fontSize: "1.1rem",
  fontWeight: 600,
  padding: "0.6rem",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: colors.blue03,
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});