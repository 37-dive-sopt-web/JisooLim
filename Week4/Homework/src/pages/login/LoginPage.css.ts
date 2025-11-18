import { style } from "@vanilla-extract/css";
import { colors, layout, typography } from "@/shared/styles/token";

export const page = style([
  layout.fullHeightCenter,
  {
    backgroundColor: colors.blue02,
    padding: "1.6rem",
  },
]);

export const box = style([
  layout.flexColumn,
  {
    width: "100%",
    maxWidth: "28rem",
    borderRadius: "10px",
    backgroundColor: colors.white01,
    padding: "2.5rem 2rem",
    gap: "1.5rem",
  },
]);

export const title = style([
  typography.headingL,
  {
    textAlign: "center",
    color: colors.black01,
  },
]);

export const form = style([
  layout.flexColumn,
  {
    gap: "1rem",
    marginBottom: "1.3rem",
  },
]);

export const signup = style([
  typography.bodyBold,
  {
    textAlign: "center",
    color: colors.blue01,
    textDecoration: "none",
  },
]);
