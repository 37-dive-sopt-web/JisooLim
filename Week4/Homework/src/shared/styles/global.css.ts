import { globalStyle } from "@vanilla-extract/css";

import { colors } from "./token/color.css";

globalStyle("html", {
  fontSize: "62.5%",
  backgroundColor: colors.white01,
  overflowX: "hidden",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
});

globalStyle("html::-webkit-scrollbar", {
  display: "none",
});

globalStyle("body", {
  fontFamily: "'Pretendard', sans-serif",
  backgroundColor: "#fff",
  minHeight: "100vh",
});
