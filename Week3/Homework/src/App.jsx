import { useState } from 'react';
import Header from './components/Header.jsx';
import GameBoard from './components/GameBoard.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');

  const headingText = activeTab === 'game' ? '게임 보드' : '랭킹 보드';

  return (
    <div className="min-h-screen bg-(--gray-extra-light)">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="rounded-3xl bg-(--white) p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-(--black)">{headingText}</h2>
          {activeTab === 'game' ? (
            <div className="mt-8 flex flex-col gap-8 lg:flex-row">
              <div className="w-full lg:max-w-2xl">
                <GameBoard />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl bg-[rgba(231,232,234,0.45)] p-6">
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
