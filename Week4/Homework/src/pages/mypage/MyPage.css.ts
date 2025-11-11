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
  borderRadius: "1rem",
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

export const infoRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.95rem",
  fontWeight: 600,
});

export const name = style({
  fontSize: "1.3rem",
  fontWeight: 600,
  color: colors.black01,
});
