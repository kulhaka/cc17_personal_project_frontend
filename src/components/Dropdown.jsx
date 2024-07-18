/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const colorMap = {
  green:
    "bg-emerald-400 border-2 border-emerald-400 text-white hover:bg-emerald-600 hover:border-emerald-600",
  black:
    "bg-black border-2 border-black text-white hover:bg-gray-600 hover:border-gray-600",
  white:
    "bg-white border-2 border-emerald-400 text-emerald-400 hover:bg-gray-200 focus:outline-none",
};

const positionMap = {
  left: "left-0",
  right: "right-0",
};

const widthMap = {
  20: "w-20",
  40: "w-40",
  auto: "w-auto",
};

export default function Dropdown({
  color = "white",
  position = "right",
  items,
  onItemClick,
  name,
  width = "auto",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item) => {
    setOpen(false);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex w-auto justify-center items-center rounded-md px-2 py-1 text-sm font-semibold ${colorMap[color]}`}
        >
          {name}
        </button>
      </div>

      {open && (
        <div
          className={`absolute ${positionMap[position]} z-10 mt-2 ${widthMap[width]} rounded-md bg-white shadow-lg`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                className="block w-full px-4 py-2 text-left text-sm text-black"
                key={index}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
