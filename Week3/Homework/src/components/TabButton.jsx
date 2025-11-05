const TabButton = ({ children, isActive = false, className = '', ...props }) => {
  const baseStyles =
    'rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gray-dark) cursor-pointer hover:-translate-y-0.5 hover:shadow-md';
  const activeStyles =
    'border-(--gray-dark) bg-(--gray-dark) text-(--white)';
  const inactiveStyles =
    'border-(--gray) bg-(--gray-light) text-(--gray) hover:bg-(--gray-extra-light)';

  const combinedClassName = [
    baseStyles,
    isActive ? activeStyles : inactiveStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={combinedClassName}
      aria-pressed={isActive}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabButton;
