/* eslint-disable react/prop-types */
const colorMap = {
  green:
    "bg-emerald-400 border-2 border-emerald-400 text-white hover:bg-emerald-600 hover:border-emerald-600",
  black:
    "bg-black border-2 border-black text-white hover:bg-gray-600 hover:border-gray-600",
  white:
    "bg-white border-2 border-emerald-400 text-emerald-400 hover:bg-gray-200 focus:outline-none",
  disabled:
    "bg-emerald-400 border-2 border-emerald-400 text-white hover:bg-emerald-600 hover:border-emerald-600 opacity-50 cursor-not-allowed",
};

const widthMap = {
  full: "w-full",
  16: "w-16",
  40: "w-40",
  auto: "w-auto",
};

const fontSizeMap = {
  sm: "text-sm",
};

const paddingMap = {
  default: "px-4 py-2",
  small: "px-2 py-1",
};

export default function Button({
  children,
  color = "white",
  width = 40,
  onClick,
  fontSize,
  padding = "default",
}) {
  return (
    <button
      className={`${paddingMap[padding]} h-full rounded-md font-semibold shadow-md ${colorMap[color]} ${widthMap[width]} ${fontSizeMap[fontSize]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
