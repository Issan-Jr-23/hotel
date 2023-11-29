export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-xs block my-1 font-bold text-zinc-400">
      {children}
    </label>
  );
}
