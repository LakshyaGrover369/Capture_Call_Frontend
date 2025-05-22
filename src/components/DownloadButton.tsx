import { FiDownload } from "react-icons/fi";
import { FaFileExcel } from "react-icons/fa";

type DownloadButtonProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const DownloadButton = ({ onClick }: DownloadButtonProps) => (
  <div
    onClick={onClick}
    className="w-32 h-12 sm:w-60 sm:h-16 cursor-pointer perspective-1000 group "
  >
    <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* Front Side */}
      <div className="text-center absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl p-4 gap-4 flex items-center justify-center shadow-md border border-gray-200">
        <FaFileExcel className="text-3xl sm:text-4xl text-green-500 mb-3 pt-2 " />
        <span className="text-xs sm:text-lg font-medium text-gray-700">
          Export Data
        </span>
      </div>

      {/* Back Side */}
      <div className="text-center absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 gap-4 flex items-center justify-center shadow-md [transform:rotateY(180deg)] text-white">
        <FiDownload className="text-lg sm:text-4xl mb-3 pt-2" />
        <span className="text-xs sm:text-lg font-medium">Download Excel</span>
      </div>
    </div>
  </div>
);

export default DownloadButton;
