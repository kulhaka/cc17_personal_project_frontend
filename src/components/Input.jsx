/* eslint-disable react/prop-types */
const widthMap = {
  full: "w-full",
  80: "w-80",
};

export default function Input({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
  width = "full",
}) {
  return (
    <div className="flex flex-col">
      <input
        placeholder={placeholder}
        type={type}
        className={`${
          widthMap[width]
        } px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-300"
        }`}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </div>
  );
}
