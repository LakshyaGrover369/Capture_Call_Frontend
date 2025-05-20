import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      if (response.data.success) {
        // Store token and user data in localStorage
        localStorage.setItem("token", response.data.token);
        const authInfo = {
          isAuthenticated: true,
          token: response.data.token,
          user: response.data.user,
          role: response.data.user.role,
        };
        localStorage.setItem("authInfo", JSON.stringify(authInfo));
        // Redirect based on role
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
    }
  };

  return (
    <div className="pt-[2.5rem] w-[100%] flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--danger)]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--danger)]"
          />
          <button
            type="submit"
            className="w-full bg-[var(--Btn-color)] text-white py-2 rounded-lg font-semibold hover:bg-[var(--Btn-hover)] transition"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/authentication/signup"
            className="text-[var(--primary-color)] font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
