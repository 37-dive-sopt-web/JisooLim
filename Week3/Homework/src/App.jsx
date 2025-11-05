import { useState } from 'react';
import Header from './components/Header.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameSidebar from './components/GameSidebar.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');
  const [boardResetToken, setBoardResetToken] = useState(0);

  const headingText = activeTab === 'game' ? '게임 보드' : '랭킹 보드';

  const handleBoardReset = () => {
    setBoardResetToken((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-(--gray-extra-light)">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="rounded-3xl bg-(--white) p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-(--black)">{headingText}</h2>
          </div>
          {activeTab === 'game' ? (
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
              <div className="flex w-full flex-col items-center gap-4 lg:max-w-[520px]">
                <div className="flex w-full max-w-[520px] justify-end">
                  <button
                    type="button"
                    aria-label="게임 보드 리셋"
                    onClick={handleBoardReset}
                    className="rounded-full bg-(--peach) px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[color-mix(in_srgb,var(--peach),#ffffff_20%)] focus-visible:outline focus-visible:outline-(--peach-dark)"
                  >
                    게임 리셋
                  </button>
                </div>
                <div className="w-full max-w-[520px]">
                  <GameBoard resetToken={boardResetToken} />
                </div>
              </div>
              <div className="w-full lg:w-[480px]">
                <GameSidebar />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl bg-[rgba(231,232,234,0.45)] p-6" />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
