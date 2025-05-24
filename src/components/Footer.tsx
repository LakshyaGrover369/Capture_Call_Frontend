import {
  FaUserShield,
  FaUsers,
  FaPhoneAlt,
  FaFileExport,
} from "react-icons/fa";
import { MdAdminPanelSettings, MdAssignment } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* System Overview */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FaUserShield className="mr-2" /> Sewadar Management System
            </h3>
            <p className="text-sm mb-3">
              Comprehensive web platform for administering sewadar volunteers
              with call tracking, batch management, and reporting capabilities.
            </p>
          </div>

          {/* Core Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              System Features
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li className="flex items-center">
                <MdAdminPanelSettings className="mr-1" /> Admin Management
              </li>
              <li className="flex items-center">
                <MdAssignment className="mr-1" /> Batch Tracking
              </li>
              <li className="flex items-center">
                <FaUsers className="mr-1" /> User Profiles
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-1" /> Call System
              </li>
              <li className="flex items-center">
                <FaFileExport className="mr-1" /> Reporting Tools
              </li>
              <li className="flex items-center">
                <FaUserShield className="mr-1" /> Prospect Management
              </li>
            </ul>
          </div>

          {/* System Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              System Capacity
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-white">Batch Management</p>
                <p className="text-gray-400">• Open/Active batches</p>
                <p className="text-gray-400">• Permanent batches</p>
                <p className="text-gray-400">• Auto-numbering</p>
              </div>
              <div>
                <p className="font-medium text-white">Call Tracking</p>
                <p className="text-gray-400">• Status categorization</p>
                <p className="text-gray-400">• Call back system</p>
                <p className="text-gray-400">• Feedback collection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Connect HQ</p>
          <p className="mt-1">
            Connect with developer?{" "}
            <a
              href="https://groverlakshya.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Visit Lakshya Grover's Portfolio
            </a>
          </p>
          <p className="mt-1">
            Developed by{" "}
            <span className="text-white font-medium">Lakshya Grover</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
