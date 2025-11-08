import GameGrid from './GameGrid.jsx';
import GameSidebar from './GameSidebar.jsx';

const GameBoard = ({
  onReset,
  resetButtonLabel = '게임 리셋',
  gridProps = {},
  sidebarProps = {},
}) => (
    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
      <section className="flex w-full flex-col items-center gap-4 lg:max-w-[520px]">
        <div className="flex w-full max-w-[520px] justify-end">
          <button
            type="button"
            aria-label="게임 보드 리셋"
          onClick={() => onReset?.()}
          className="rounded-full bg-(--peach) px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[color-mix(in_srgb,var(--peach),#ffffff_20%)] focus-visible:outline focus-visible:outline-(--peach-dark)"
        >
          {resetButtonLabel}
        </button>
        </div>
        <div className="w-full max-w-[520px]">
          <GameGrid {...gridProps} />
        </div>
      </section>
      <div className="w-full lg:w-[480px]">
        <GameSidebar {...sidebarProps} />
      </div>
    </div>
  );

export default GameBoard;
