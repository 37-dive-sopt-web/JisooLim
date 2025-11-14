import { style, styleVariants } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token";

export const buttonContainer = style({
  border: "none",
  borderRadius: "5px",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
  selectors: {
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const fullWidth = style({
  width: "100%",
});

export const sizeVariants = styleVariants({
  medium: {
    fontSize: "1.1rem",
    padding: "0.6rem 1rem",
  },
  small: {
    fontSize: "0.95rem",
    padding: "0.45rem 0.9rem",
  },
});

export const toneVariants = styleVariants({
  primary: {
    backgroundColor: colors.blue01,
    color: colors.white01,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: colors.blue03,
      },
    },
  },
  secondary: {
    backgroundColor: colors.white01,
    color: colors.blue01,
    border: `0.1rem solid ${colors.blue01}`,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: colors.blue02,
        color: colors.white01,
      },
    },
  },
  danger: {
    backgroundColor: colors.red01,
    color: colors.white01,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#d45c5c",
      },
    },
  },
});
