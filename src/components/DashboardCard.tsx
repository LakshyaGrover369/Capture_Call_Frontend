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
    <div className="w-full md:px-2">
      <div className="relative h-[100px] sm:h-[160px] rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
        <div className="flex items-center justify-between h-full">
          <div className="sm:space-y--2">
            <p className="sm:text-sm md:text-lg text-gray-600 font-semibold">
              {title}
            </p>
            <h2 className=" text-2xl sm:text-4xl md:text-5xl  font-extrabold text-gray-800">
              {count}
            </h2>
          </div>
          <div
            className={`sm:w-20 sm:h-20 rounded-xl p-4 flex justify-center items-center shadow-md ${bgColor}`}
          >
            <img
              src={imageSrc}
              alt={title}
              className=" w-6 h-6 sm:w-12 sm:h-12 lg:w-20 lg:h-20 object-contain"
            />
          </div>
        </div>

        {/* Glow effect ring */}
        <div
          className="absolute -bottom-3 -right-3 w-16 h-16 bg-opacity-10 rounded-full blur-2xl opacity-50 pointer-events-none"
          style={{ backgroundColor: "#3b82f6" }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardCard;
