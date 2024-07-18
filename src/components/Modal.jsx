/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ width = 30, title, children, open, onClose }) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [onClose]);

  const handleMouseDown = (e) => {
    if (e.button !== 2) {
      onClose?.();
    }
  };

  return (
    <>
      {open
        ? createPortal(
            <>
              <div className="fixed inset-0 bg-white opacity-50 z-40 "></div>
              <div className="fixed inset-0 z-40" onMouseDown={handleMouseDown}>
                <div className="flex justify-center items-center min-h-screen ">
                  <div
                    className="bg-white rounded-md shadow-md"
                    style={{ width: `${width}rem` }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center p-4">
                      <div></div>
                      <h5 className="text-xl font-bold">{title}</h5>
                      <button onClick={onClose}>&#10005;</button>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-96">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </>,
            document.getElementById("modal")
          )
        : null}
    </>
  );
}
