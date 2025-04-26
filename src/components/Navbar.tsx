import  { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const Navbar = () => {
  useEffect(() => {
    $("#menu-button").on("click", function () {
      $("#menu").toggleClass("hidden");
    });

    return () => {
      $("#menu-button").off("click");
    };
  }, []);

  return (
    <>
      <div className="antialiased bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <header>
          <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white">
            <div>logo</div>
            <div
              className="hidden w-full md:flex md:items-center md:w-auto"
              id="menu"
            >
              <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="md:p-4 py-2 block hover:text-[var(--primary-color)]"
                  >
                    Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/dashboard"
                    className="md:p-4 py-2 block hover:text-[var(--primary-color)]"
                  >
                    User
                  </Link>
                </li>
                <li>
                  <Link
                    to="/authentication/signin"
                    className="md:p-4 py-2 block hover:text-[var(--primary-color)]"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/authentication/signup"
                    className="md:p-4 py-2 block hover:text-[var(--primary-color)]"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
