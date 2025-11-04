import { useState } from 'react';
import Header from './components/Header.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');

  const headingText = activeTab === 'game' ? '게임' : '랭킹';

  return (
    <div className="min-h-screen bg-(--gray-extra-light)">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="rounded-3xl bg-(--white) p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-(--black)">
            {headingText}
          </h2>
        </section>
      </div>
    </div>
  );
};

export default App;
