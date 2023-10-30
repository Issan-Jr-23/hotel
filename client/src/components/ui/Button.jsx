export function Button({ onClick, children }) {
  return (
    <button
      className="rounded-xl mt-3 font-medium text-white bg-gradient-to-r from-emerald-400 to-cyan-500 w-28 h-10"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
