import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token";

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

export const title = style({
  fontSize: "1.8rem",
  fontWeight: 700,
  textAlign: "center",
  color: colors.black01,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "1.3rem",
});

export const signup = style({
  textAlign: "center",
  color: colors.blue01,
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "1rem",
});
