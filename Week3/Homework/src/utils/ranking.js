export const sortRecordsByTime = (records, levelOrder = {}) => {
  const next = [...records];
  next.sort((a, b) => {
    if (a.clearSeconds !== b.clearSeconds) {
      return a.clearSeconds - b.clearSeconds;
    }
    const levelDiff =
      (levelOrder[b.levelId] ?? 0) - (levelOrder[a.levelId] ?? 0);
    if (levelDiff !== 0) {
      return levelDiff;
    }
    const timestampA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timestampB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return timestampA - timestampB;
  });
  return next;
};
