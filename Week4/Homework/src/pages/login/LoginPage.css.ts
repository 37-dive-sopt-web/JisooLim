import { style } from "@vanilla-extract/css";
import { colors, typography } from "@/shared/styles/token";

export const page = style({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.blue02,
  padding: "1.6rem",
});

export const box = style({
  width: "100%",
  maxWidth: "28rem",
  borderRadius: "10px",
  backgroundColor: colors.white01,
  padding: "2.5rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const title = style([
  typography.headingL,
  {
    textAlign: "center",
    color: colors.black01,
  },
]);

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "1.3rem",
});

export const signup = style([
  typography.bodyBold,
  {
    textAlign: "center",
    color: colors.blue01,
    textDecoration: "none",
  },
]);
