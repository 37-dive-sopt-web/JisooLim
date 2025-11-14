import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token";

export const page = style({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1.6rem",
});

export const box = style({
  width: "100%",
  maxWidth: "32rem",
  borderRadius: "10px",
  boxShadow: `0 0 5px ${colors.gray01}`,
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
  gap: "1rem",
});

export const result = style({
  marginTop: "1rem",
  borderTop: `1px solid ${colors.gray01}`,
  paddingTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

export const resultRow = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "1rem",
  color: colors.black01,
  fontWeight: 600,
});
