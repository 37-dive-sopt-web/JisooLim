import IcDownarrow from '../assets/svgs/icDownarrow.jsx';

const LevelSelector = ({ levels = [], selectedLevelId, onLevelChange }) => (
  <div className="relative shrink-0">
    <select
      id="level-select"
      className="w-full appearance-none rounded-xl border border-[rgba(63,72,82,0.2)] bg-white py-3 pl-4 pr-10 text-sm font-semibold shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-(--card-back)"
      value={selectedLevelId}
      onChange={(event) => onLevelChange?.(event.target.value)}
    >
      {levels.map((level) => (
        <option key={level.id} value={level.id}>
          {level.label}
        </option>
      ))}
    </select>
    <IcDownarrow
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-4 my-auto h-4 w-4 text-(--gray)"
    />
  </div>
);

export default LevelSelector;
