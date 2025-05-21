import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        const authInfo = {
          isAuthenticated: true,
          token: response.data.token,
          user: response.data.user,
          role: response.data.user.role,
        };
        localStorage.setItem("authInfo", JSON.stringify(authInfo));
        const role = response.data.user.role;
        window.location.href =
          role === "admin" ? "/admin/dashboard" : "/user/dashboard";
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message || "Login failed");
      } else {
        alert("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20">
          {/* Decorative elements */}
          <div className="absolute w-30 h-30 bg-blue-400/60 rounded-full -top-10 -left-10"></div>
          <div className="absolute w-40 h-40 bg-indigo-400/60 rounded-full -bottom-20 -right-10"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                Welcome Back
              </h1>
              <p className="text-white/80">Sign in to access your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiMail className="text-white/80 group-focus-within:text-white" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiLock className="text-white/80 group-focus-within:text-white" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/authentication/forgot-password"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{" "}
                <Link
                  to="/authentication/signup" // Changed to a more standard path
                  className="text-white font-semibold hover:underline transition-colors duration-200 hover:text-blue-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
