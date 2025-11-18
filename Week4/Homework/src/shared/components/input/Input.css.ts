import { style } from "@vanilla-extract/css";
import { colors, layout, typography } from "@/shared/styles/token";

export const container = style([
  layout.flexColumn,
  {
    gap: "0.5rem",
  },
]);

export const label = style([
  typography.labelBold,
  {
    color: colors.black01,
  },
]);

export const inputWrapper = style({
  position: "relative",
});

export const input = style([
  typography.body,
  {
    width: "100%",
    borderRadius: "5px",
    border: `0.1rem solid ${colors.blue02}`,
    padding: "0.6rem 1rem",
    backgroundColor: colors.white01,
    transition: "border-color 0.2s ease",
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
  },
]);

export const inputWithToggle = style([
  input,
  {
    paddingLeft: "1rem",
    paddingRight: "2.75rem",
  },
]);

export const toggleButton = style({
  position: "absolute",
  top: "50%",
  right: "0.4rem",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  padding: "0.2rem",
  color: colors.black01,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const error = style([
  typography.caption,
  {
    color: colors.red01,
  },
]);
