import { style } from "@vanilla-extract/css";
import { colors, typography } from "@/shared/styles/token";

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

export const title = style([
  typography.headingXL,
  {
    textAlign: "center",
    color: colors.black01,
  },
]);

export const infoRow = style([
  typography.labelBold,
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
]);

export const name = style([
  typography.subtitle,
  {
    color: colors.black01,
  },
]);
