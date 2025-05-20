import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/add-admin", label: "Add Admin", icon: "👥" },
    { path: "/admin/user-details", label: "User Details", icon: "📋" },
    { path: "/admin/admin-details", label: "Admin Details", icon: "👤" },
    { path: "/admin/add-prospects", label: "Add Prospects", icon: "➕" },
    {
      path: "/admin/add-prospects-excel",
      label: "Add Prospects By Excel",
      icon: "📄",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 text-white transition-all duration-500 shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-300">
          <h2 className={`${!isSidebarOpen && "hidden"} text-2xl font-bold`}>
            Admin Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none hover:scale-110 transition"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-300
    ${
      location.pathname === item.path
        ? "bg-[#F3F4F6] text-blue-600 mr-[-6px]"
        : "text-white hover:bg-blue-500 hover:text-white"
    }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span
                className={`text-md font-medium transition-opacity duration-300 ${
                  !isSidebarOpen
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100"
                }`}
              >
                {item.label}
              </span>
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
