import { useEffect } from "react";

export const useClickOutside = (ref, handler, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      // якщо клік поза елементом
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, enabled]);
};
