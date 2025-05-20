import React from "react";

interface HeadingProps {
  text: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  align?: "left" | "center" | "right";
  withUnderline?: boolean;
  withDecoration?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  text,
  className = "",
  variant = "primary",
  align = "center",
  withUnderline = false,
  withDecoration = true,
}) => {
  const variantStyles = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    accent: "text-blue-600",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`relative ${alignStyles[align]} ${className}`}>
      {withDecoration && (
        <div className="absolute -top-4 -left-6 w-4 h-4 rounded-full bg-blue-500 opacity-20"></div>
      )}
      <h1
        className={`text-4xl md:text-5xl font-bold leading-tight tracking-tight ${variantStyles[variant]}`}
      >
        {text}
      </h1>
      {withUnderline && (
        <div
          className={`mt-4 w-20 h-1 rounded-full ${
            variant === "accent" ? "bg-blue-500" : "bg-gray-300"
          } ${
            align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
          }`}
        ></div>
      )}
      {withDecoration && (
        <div className="absolute -bottom-4 -right-6 w-4 h-4 rounded-full bg-blue-500 opacity-20"></div>
      )}
    </div>
  );
};

export default Heading;
