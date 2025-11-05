const dateTimeFormatter = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeStyle: 'medium',
});

export const formatSeconds = (value, { trimZeros = false } = {}) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return trimZeros ? '0' : '0.00';
  }
  const formatted = value.toFixed(2);
  return trimZeros ? formatted.replace(/\.?0+$/, '') : formatted;
};

export const formatTimestamp = (value) => {
  if (!value) {
    return '-';
  }
  try {
    return dateTimeFormatter.format(new Date(value));
  } catch {
    return '-';
  }
};
