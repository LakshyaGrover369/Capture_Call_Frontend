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
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "Enter your phone number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Create a password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
      placeholder: "Confirm your password",
    },
    {
      name: "BatchNumber",
      label: "Batch Number",
      type: "text",
      required: true,
      placeholder: "Enter batch number",
    },
  ];

  return (
    <>
      <div className="pt-[2.5rem] w-[100%] flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Create Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {formInputs.map((input) => (
              <input
                key={input.name}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof typeof formData] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--danger)]"
              />
            ))}
            <button
              type="submit"
              className="w-full bg-[var(--Btn-color)] text-white py-2 rounded-lg font-semibold hover:bg-[var(--Btn-hover)] transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/authentication/signin"
              className="text-[var(--primary-color)] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
