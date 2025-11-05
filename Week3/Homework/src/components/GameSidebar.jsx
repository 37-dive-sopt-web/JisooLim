import { SIDEBAR_STATUS_MESSAGES } from '../constants/messages.js';
import LevelSelector from './LevelSelector.jsx';
import StatCardList from './StatCardList.jsx';
import HistoryList from './HistoryList.jsx';

const GameSidebar = ({
  levels = [],
  selectedLevelId,
  onLevelChange,
  stats = {
    totalPairs: 0,
    matchedPairs: 0,
    remainingPairs: 0,
    timeLeft: 0,
  },
  status = 'idle',
  history = [],
}) => {
  const statusMessage =
    SIDEBAR_STATUS_MESSAGES[status] ?? SIDEBAR_STATUS_MESSAGES.idle;

  return (
    <aside className="flex h-full min-h-0 w-full flex-col space-y-5 overflow-hidden rounded-2xl bg-[rgba(231,232,234,0.45)] p-6">
      <LevelSelector
        levels={levels}
        selectedLevelId={selectedLevelId}
        onLevelChange={onLevelChange}
      />
      <StatCardList stats={stats} />
      <div className="shrink-0 rounded-xl bg-white/70 p-4">
        <p className="text-sm font-semibold">{statusMessage}</p>
      </div>
      <HistoryList history={history} />
    </aside>
  );
};

export default GameSidebar;
