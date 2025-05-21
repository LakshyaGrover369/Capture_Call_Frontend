import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    BatchNumber: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );
      if (response.status === 201) {
        alert("Registration successful!");
        window.location.href = "/authentication/signin";
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message || "Registration failed");
      } else {
        alert("Registration failed");
      }
    }
  };

  const formInputs = [
    { name: "name", label: "Full Name", type: "text", icon: "👤" },
    { name: "email", label: "Email", type: "email", icon: "✉️" },
    { name: "phoneNumber", label: "Phone", type: "tel", icon: "📱" },
    { name: "password", label: "Password", type: "password", icon: "🔒" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      icon: "🔏",
    },
    { name: "BatchNumber", label: "Batch Number", type: "text", icon: "🔢" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 md:p-8">
      {/* Floating bubbles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-200/20"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Main card with split layout for larger screens */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-blue-200/50 flex flex-col md:flex-row">
          {/* Left decorative panel - hidden on mobile */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-500 p-8 items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Welcome!</h3>
              <p className="text-blue-100 mb-8">
                Join our community of dedicated volunteers
              </p>
              <div className="animate-float">
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#9333EA"
                    d="M41.3,-69.5C55.4,-60.8,69.3,-50.7,74.1,-37.6C78.9,-24.5,74.5,-8.3,67.4,5.9C60.2,20,50.3,32.2,39.1,45.2C27.9,58.3,15.5,72.1,1.3,70.5C-13,68.9,-26.1,52,-38.3,39.2C-50.4,26.4,-61.5,17.7,-66.6,5.3C-71.8,-7.1,-71.1,-23.3,-63.6,-37.1C-56.1,-51,-41.8,-62.5,-26.7,-70.2C-11.6,-77.9,4.2,-81.8,18.7,-77.5C33.2,-73.2,46.2,-60.5,41.3,-69.5Z"
                    transform="translate(100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="#1E40AF"
                    stroke="#fff"
                    strokeWidth="3"
                  />
                  <g transform="translate(100 100)">
                    <circle cx="0" cy="-10" r="8" fill="#fff" />
                    <path d="M -15 15 Q 0 0 15 15" fill="#fff" />
                  </g>
                  <g transform="translate(160 140) rotate(-20)">
                    <rect
                      x="-8"
                      y="-16"
                      width="16"
                      height="32"
                      rx="4"
                      fill="#10B981"
                    />
                    <circle cx="0" cy="12" r="2" fill="#fff" />
                    <path d="M -4 -10 L4 -10 L4 4 L-4 4 Z" fill="#fff" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="w-full md:w-1/2 p-6 md:p-10">
            <div className="md:hidden text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-700">
                Create Account
              </h2>
              <p className="text-blue-500">Join our volunteer community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {formInputs.map((input) => (
                <div key={input.name} className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 group-focus-within:text-blue-600 transition-colors">
                    {input.icon}
                  </div>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.label}
                    value={formData[input.name as keyof typeof formData] || ""}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 hover:bg-white"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign Up
              </button>
            </form>

            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-blue-200"></div>
              <span className="flex-shrink mx-4 text-blue-500 text-sm">OR</span>
              <div className="flex-grow border-t border-blue-200"></div>
            </div>

            <p className="text-center text-blue-700">
              Already have an account?{" "}
              <Link
                to="/authentication/signin"
                className="font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-400/70 text-xs mt-6">
          Empowering volunteer coordination • © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
