import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/token/color.css";

export const header = style({
  width: "100%",
  padding: "1.6rem 2rem",
  backgroundColor: colors.blue01,
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

export const topRow = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

export const leftSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  color: colors.white01,
  flex: 1,
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
  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
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

export const greet = style({
  margin: 0,
  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
});

export const menuButton = style({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  color: colors.white01,
  cursor: "pointer",
  padding: "0.25rem",
  "@media": {
    "(max-width: 768px)": {
      display: "inline-flex",
    },
  },
});

export const mobileMenu = style({
  display: "none",
  width: "100%",
  flexDirection: "column",
  overflow: "hidden",
  maxHeight: 0,
  opacity: 0,
  transform: "translateY(-0.5rem)",
  transition: "max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease, padding 0.3s ease",
  gap: "0.6rem",
  "@media": {
    "(max-width: 768px)": {
      display: "flex",
    },
  },
});

export const mobileMenuOpen = style({
  maxHeight: "20rem",
  opacity: 1,
  transform: "translateY(0)",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  marginTop: "0.5rem",
});

export const mobileMenuItem = style({
  width: "100%",
  display: "block",
  textDecoration: "none",
  color: colors.white01,
  fontWeight: 600,
  background: "transparent",
  border: "none",
  padding: "0.5rem 0",
  textAlign: "left",
  cursor: "pointer",
});
