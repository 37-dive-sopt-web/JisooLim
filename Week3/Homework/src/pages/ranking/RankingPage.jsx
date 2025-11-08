import RankingBoard from './components/RankingBoard.jsx';

const RankingPage = ({ records = [], onResetRecords }) => (
  <div className="mt-8 min-h-[520px]">
    <RankingBoard records={records} onReset={onResetRecords} />
  </div>
);

export default RankingPage;
