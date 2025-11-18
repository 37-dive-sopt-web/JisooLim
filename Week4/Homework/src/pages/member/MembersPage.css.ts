import { style } from "@vanilla-extract/css";
import { colors, layout, typography } from "@/shared/styles/token";

export const page = style([
  layout.fullHeightCenter,
  {
    padding: "1.6rem",
  },
]);

export const box = style([
  layout.flexColumn,
  {
    width: "100%",
    maxWidth: "32rem",
    borderRadius: "10px",
    boxShadow: `0 0 5px ${colors.gray01}`,
    padding: "2.5rem 2rem",
    gap: "1.6rem",
  },
]);

export const title = style([
  typography.headingXL,
  {
    textAlign: "center",
    color: colors.black01,
  },
]);

export const form = style([
  layout.flexColumn,
  {
    gap: "1rem",
  },
]);

export const result = style([
  layout.flexColumn,
  {
    marginTop: "1rem",
    borderTop: `1px solid ${colors.gray01}`,
    paddingTop: "1rem",
    gap: "0.75rem",
  },
]);

export const resultRow = style([
  layout.rowBetweenCenter,
  typography.bodyBold,
  {
    color: colors.black01,
  },
]);
