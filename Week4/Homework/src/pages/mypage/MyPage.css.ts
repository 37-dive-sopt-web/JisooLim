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

export const infoRow = style([layout.rowBetweenCenter, typography.labelBold]);

export const name = style([
  typography.subtitle,
  {
    color: colors.black01,
  },
]);
