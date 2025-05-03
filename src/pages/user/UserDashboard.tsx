import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/user/prospects-details", label: "Prospects Details", icon: "👥" },
    { path: "/user/nominal-list", label: "Nominal List", icon: "📋" },
    { path: "/user/add-prospects", label: "Add Prospects", icon: "➕" },
    {
      path: "/user/add-prospects-excel",
      label: "Add Prospects By Excel",
      icon: "➕",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[var(--primary-color)] text-white transition-all duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`${!isSidebarOpen && "hidden"} font-bold text-xl`}>
            User Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-4 hover:bg-[var(--Btn-hover)] transition-colors
                ${
                  location.pathname === item.path ? "bg-[var(--Btn-color)]" : ""
                }
              `}
            >
              <span className="mr-3">{item.icon}</span>
              <span className={`${!isSidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
