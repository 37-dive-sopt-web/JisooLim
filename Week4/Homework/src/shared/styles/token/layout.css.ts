export const layout = {
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  rowCenter: {
    display: "flex",
    alignItems: "center",
  },
  rowBetweenCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fullHeightCenter: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
