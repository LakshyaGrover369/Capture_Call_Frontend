import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: "guest",
  });

  const location = useLocation();

  useEffect(() => {
    const authInfo = localStorage.getItem("authInfo");
    const storedAuth = authInfo ? JSON.parse(authInfo) : null;
    if (storedAuth?.isAuthenticated) {
      setAuth(storedAuth);
    } else {
      setAuth({ isAuthenticated: false, role: "guest" });
    }
    setIsMenuOpen(false); // close on route change
  }, [location]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const commonLinks = [
    { name: "Home", to: "/home" },
    { name: "About", to: "/about" },
  ];

  const guestLinks = [
    { name: "Sign In", to: "/authentication/signin" },
    { name: "Sign Up", to: "/authentication/signup" },
  ];

  const userLinks = [{ name: "User Dashboard", to: "/user/dashboard" }];

  const adminLinks = [
    { name: "Admin Dashboard", to: "/admin/dashboard" },
    { name: "User Dashboard", to: "/user/dashboard" },
  ];

  let navLinks = [...commonLinks];
  if (!auth.isAuthenticated) {
    navLinks = [...navLinks, ...guestLinks];
  } else if (auth.role === "user") {
    navLinks = [...navLinks, ...userLinks, ...guestLinks];
  } else if (auth.role === "admin") {
    navLinks = [...navLinks, ...adminLinks, ...guestLinks];
  }

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between z-50 relative">
        <div className="text-2xl font-extrabold text-gray-800">
          Euronext App
        </div>

        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <span className="text-3xl text-gray-800">&#9776;</span>
        </button>

        <ul
          className={`flex-col md:flex-row md:flex gap-6 text-gray-700 font-medium absolute md:static top-[64px] left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out
          ${isMenuOpen ? "flex p-4" : "hidden md:flex"}`}
        >
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.to}
                className="block py-2 px-3 rounded hover:bg-indigo-100 md:hover:bg-transparent hover:text-indigo-600 transition duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
