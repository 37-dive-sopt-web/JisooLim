export const SIDEBAR_STATUS_MESSAGES = {
  idle: '카드를 눌러 게임을 시작해 보세요 !',
  success: '성공 !🤩',
  failure: '실패 !😞',
  resolving: '잠시만 기다려 주세요..',
  duplicate: '이미 선택한 카드에요 😮',
  timeout: '시간이 초과됐어요 🕒',
};

export const RESULT_MODAL_MESSAGES = {
  success: {
    heading: '축하합니다 !!',
    primary: (levelLabel, seconds) =>
      `${levelLabel}을 ${seconds}초 만에 클리어했어요`,
    countdownClass: 'text-(--green)',
  },
  timeout: {
    heading: '아쉽지만 다음 기회에',
    primary: (levelLabel) => `${levelLabel}을 제한 시간 안에 클리어하지 못했어요`,
    countdownClass: 'text-(--peach-dark)',
  },
};
