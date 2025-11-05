import { useState } from 'react';
import Header from './components/Header.jsx';
import GamePage from './pages/game/GamePage.jsx';
import RankingPage from './pages/ranking/RankingPage.jsx';
import {
  LEVELS,
  LEVEL_ORDER,
  RANKING_STORAGE_KEY,
} from './constants/gameConfig.js';
import { useRankingRecords } from './hooks/index.js';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');
  const headingText = activeTab === 'game' ? '게임 보드' : '랭킹 보드';

  const {
    records: rankingRecords,
    addRecord: addRankingRecord,
    resetRecords: resetRankingRecords,
  } = useRankingRecords({
    storageKey: RANKING_STORAGE_KEY,
    levels: LEVELS,
    levelOrder: LEVEL_ORDER,
  });

  return (
    <div className="min-h-screen bg-(--gray-extra-light)">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="rounded-3xl bg-(--white) p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-(--black)">{headingText}</h2>
          </div>
          {activeTab === 'game' ? (
            <GamePage onAddRecord={addRankingRecord} />
          ) : (
            <RankingPage
              records={rankingRecords}
              onResetRecords={resetRankingRecords}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
