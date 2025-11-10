import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token/color.css";

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
  maxWidth: "32rem",
  borderRadius: "1rem",
  backgroundColor: colors.white01,
  padding: "2.5rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const title = style({
  fontSize: "2rem",
  fontWeight: 700,
  textAlign: "center",
  color: colors.black01,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const actions = style({
  display: "flex",
  gap: "0.8rem",
  width: "100%",
});

export const singleAction = style({
  width: "100%",
});

export const actionButton = style({
  flex: 1,
});

export const back = style({
  textAlign: "center",
  color: colors.black01,
  fontWeight: 600,
  fontSize: "0.9rem",
});

export const backLink = style({
  color: colors.blue01,
  textDecoration: "none",
});
