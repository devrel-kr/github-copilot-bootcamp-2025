import React from 'react';

const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  onClick, 
  className = "",
  disabled = false,
  small = false
}) => {
  
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  const sizeStyles = small 
    ? "px-3 py-1.5 text-sm"
    : "px-4 py-2 text-base";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
    outline: "bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 text-gray-700"
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;