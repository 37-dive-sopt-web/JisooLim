import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token/color.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const label = style({
  fontSize: "0.95rem",
  fontWeight: 600,
  color: colors.black01,
});

export const input = style({
  width: "100%",
  borderRadius: "0.5rem",
  border: `0.1rem solid ${colors.blue02}`,
  padding: "0.6rem 1rem",
  fontSize: "1rem",
  backgroundColor: colors.white01,
  selectors: {
    "&::placeholder": {
      color: colors.black01,
      opacity: 0.5,
    },
    "&:focus": {
      outline: "none",
      borderColor: colors.blue01,
    },
  },
});

export const error = style({
  fontSize: "0.85rem",
  color: colors.black01,
  opacity: 0.7,
});
