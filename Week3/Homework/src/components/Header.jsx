import TabButton from './TabButton.jsx';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="flex items-center justify-between rounded-4xl bg-(--gray-light) px-10 py-8 shadow-sm">
      <h1 className="text-3xl font-extrabold tracking-tight text-(--black)">
        숫자 카드 짝 맞추기
      </h1>
      <div className="flex items-center gap-3">
        <TabButton
          isActive={activeTab === 'game'}
          onClick={() => onTabChange?.('game')}
        >
          게임
        </TabButton>
        <TabButton
          isActive={activeTab === 'ranking'}
          onClick={() => onTabChange?.('ranking')}
        >
          랭킹
        </TabButton>
      </div>
    </header>
  );
};

export default Header;
