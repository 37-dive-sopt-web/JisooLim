import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token/color.css";

export const header = style({
  width: "100%",
  padding: "1.6rem 2rem",
  backgroundColor: colors.blue01,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const leftSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  color: colors.white01,
});

export const title = style({
  fontSize: "1.5rem",
  fontWeight: 700,
});

export const rightSection = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  color: colors.white01,
});

export const linkText = style({
  textDecoration: "none",
  color: colors.white01,
  fontWeight: 600,
});

export const button = style({
  border: "none",
  backgroundColor: colors.blue01,
  color: colors.white01,
  fontWeight: 600,
  cursor: "pointer",
});
