import React from "react";

interface SubHeadingProps {
  text: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  align?: "left" | "center" | "right";
  withDecoration?: boolean;
}

const SubHeading: React.FC<SubHeadingProps> = ({
  text,
  className = "",
  variant = "primary",
  align = "center",
  withDecoration = false,
}) => {
  const variantStyles = {
    primary: "text-gray-800",
    secondary: "text-gray-600",
    accent: "text-blue-500",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`relative ${alignStyles[align]} ${className}`}>
      {withDecoration && (
        <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 font-black rounded-full bg-blue-400"></span>
      )}
      <h2
        className={`text-2xl md:text-3xl font-black tracking-normal ${variantStyles[variant]}`}
      >
        {text}
      </h2>
    </div>
  );
};

export default SubHeading;
