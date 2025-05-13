import React from "react";

interface DashboardCardProps {
  title: string;
  count: number | string;
  imageSrc: string;
  bgColor: string; // e.g., "bg-blue-500"
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  count,
  imageSrc,
  bgColor,
}) => {
  return (
    <div className="w-full px-2">
      <div className="h-[150px] rounded-2xl border shadow-md p-4 bg-white flex flex-col justify-around">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-medium text-gray-500">{title}</p>{" "}
            {/* Increased text size */}
            <h2 className="text-4xl font-bold text-gray-800">{count}</h2>{" "}
            {/* Increased text size */}
          </div>
          <div
            className={`rounded-full p-3 flex justify-center items-center ${bgColor}`}
          >
            <img src={imageSrc} alt={title} className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
