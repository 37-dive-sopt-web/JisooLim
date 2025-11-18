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
    maxWidth: "32rem",
    borderRadius: "10px",
    backgroundColor: colors.white01,
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
    gap: "1.2rem",
  },
]);

export const actions = style([
  layout.rowCenter,
  {
    gap: "0.8rem",
    width: "100%",
  },
]);

export const singleAction = style({
  width: "100%",
});

export const actionButton = style({
  flex: 1,
});

export const back = style([
  typography.captionBold,
  {
    textAlign: "center",
    color: colors.black01,
  },
]);

export const backLink = style({
  color: colors.blue01,
  textDecoration: "none",
});
