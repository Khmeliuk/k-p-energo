import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  };

  return (
    <button
      className={twMerge(
        "px-4 py-2 rounded-xl text-sm font-medium transition",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "outline", "secondary"]),
};
