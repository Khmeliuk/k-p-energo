import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={twMerge(
        "border border-gray-300 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
};
