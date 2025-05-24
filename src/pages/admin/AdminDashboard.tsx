import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { IoIosPersonAdd } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";
import { MdDashboard } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa6";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/add-admin", label: "Add Admin", icon: <IoIosPersonAdd /> },
    {
      path: "/admin/user-details",
      label: "User Details",
      icon: <BiSolidUserDetail />,
    },
    {
      path: "/admin/admin-details",
      label: "Admin Details",
      icon: <RiAdminFill />,
    },
    {
      path: "/admin/add-prospects",
      label: "Add Prospects",
      icon: <TiUserAdd />,
    },
    {
      path: "/admin/add-prospects-excel",
      label: "Add Prospects By Excel",
      icon: <FaFileExcel />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-14 sm:w-20"
        } bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white transition-all duration-500 shadow-lg`}
      >
        <div className="flex items-center justify-between sm:justify-between p-3 sm:p-4 border-b border-blue-300 m-auto">
          <h2 className={`${!isSidebarOpen && "hidden"} text-2xl font-bold`}>
            Admin Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none transform transition-all duration-500 ease-in-out hover:scale-125 hover:rotate-360 active:scale-95 pr-3 "
          >
            {isSidebarOpen ? (
              <div className=" sm:ml-0 sm:m-0 ">
                <RxCross1 className=" " />
              </div>
            ) : (
              <HiOutlineMenuAlt1 className=" ml-1 sm:ml-0hover:scale-110 duration-500" />
            )}
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-2 sm:px-4 py-3 mx-2 rounded-lg transition-all duration-300
    ${
      location.pathname === item.path
        ? "bg-[#F3F4F6] text-blue-600 mr-[-6px]"
        : "text-white hover:bg-blue-500 hover:text-white"
    }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>

              {isSidebarOpen && (
                <span
                  className={`text-md font-medium transition-opacity duration-300 ${
                    !isSidebarOpen
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
