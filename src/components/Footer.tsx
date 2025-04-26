import React from "react";
import calling from "../assets/Gifs/calling.gif";

const Footer = () => {
  return (
    <>
      <footer className="bg-[var(--secondary-color)] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-[black] ">
                YourCompany
              </h2>
              <p className="text-sm text-[black]">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="text-[black] hover:text-gray-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[black] hover:text-gray-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[black] hover:text-gray-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[black] hover:text-gray-500">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-6 text-center text-sm text-[black]">
            Built By <strong className="text-[black]">Lakshya Grover</strong>{" "}
            using React + Tailwind CSS
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
