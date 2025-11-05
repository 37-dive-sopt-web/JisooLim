const GameSidebar = () => {
  return (
    <aside className="flex h-full w-full flex-col gap-5 rounded-2xl bg-[rgba(231,232,234,0.45)] p-6">
      <div className="h-14 rounded-xl bg-white/70" aria-hidden="true" />
      <div className="grid grid-cols-3 gap-4" aria-hidden="true">
        <div className="h-24 rounded-xl bg-white/70" />
        <div className="h-24 rounded-xl bg-white/70" />
        <div className="h-24 rounded-xl bg-white/70" />
      </div>
      <div className="h-32 rounded-xl bg-white/70" aria-hidden="true" />
      <div className="h-48 rounded-xl bg-white/70" aria-hidden="true" />
      <div className="flex-1 rounded-xl bg-white/70" aria-hidden="true" />
    </aside>
  );
};

export default GameSidebar;
