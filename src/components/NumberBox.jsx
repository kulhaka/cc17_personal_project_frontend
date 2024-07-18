/* eslint-disable react/prop-types */
export default function Button({ children }) {
  return (
    <button className="rounded-xl px-2 py-1  text-black text-sm font-semibold bg-white disabled pointer-events-none w-full">
      {children}
    </button>
  );
}
