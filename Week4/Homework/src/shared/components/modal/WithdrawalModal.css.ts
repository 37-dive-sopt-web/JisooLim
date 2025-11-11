import { keyframes, style } from "@vanilla-extract/css";
import { colors, zIndex } from "@/shared/styles/token";

const overlayFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const modalSlideIn = keyframes({
  from: { opacity: 0, transform: "translateY(-1rem)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 1.5rem",
  zIndex: zIndex.modal,
  animation: `${overlayFadeIn} 0.2s ease`,
});

export const content = style({
  width: "100%",
  maxWidth: "24rem",
  backgroundColor: colors.white01,
  borderRadius: "0.9rem",
  padding: "1.5rem",
  boxShadow: "0 1rem 2.5rem rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  textAlign: "center",
  animation: `${modalSlideIn} 0.25s ease`,
});

export const title = style({
  margin: 0,
  fontSize: "1.15rem",
  fontWeight: 700,
  color: colors.black01,
});

export const description = style({
  margin: 0,
  fontSize: "0.95rem",
  color: colors.black01,
  opacity: 0.8,
  lineHeight: 1.4,
});

export const actions = style({
  display: "flex",
  gap: "0.75rem",
  justifyContent: "center",
});

export const actionButton = style({
  flex: 1,
});
