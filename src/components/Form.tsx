import React, { useState } from "react";
import axios from "axios";

interface InputField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: any;
}

interface FormProps {
  inputs: InputField[];
  submitRoute: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: any) => void;
  submitButtonText?: string;
}

const Form: React.FC<FormProps> = ({
  inputs,
  submitRoute,
  onSubmitSuccess,
  onSubmitError,
  submitButtonText = "Submit",
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(() =>
    inputs.reduce((acc, input) => {
      if (input.defaultValue !== undefined) {
        acc[input.name] = input.defaultValue;
      }
      return acc;
    }, {} as { [key: string]: any })
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" && files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(submitRoute, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log(response.data);
      if (onSubmitSuccess) onSubmitSuccess();
      setFormData({});
    } catch (error) {
      if (onSubmitError) onSubmitError(error);
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate grid columns based on input count
  const getGridColumns = () => {
    if (inputs.length <= 3)
      return `grid-cols-1 md:grid-cols-${inputs.length} lg:grid-cols-${inputs.length}`;
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div className="w-full  sm:p-6">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full"
      >
        <div className={`grid ${getGridColumns()} gap-6 mb-8`}>
          {inputs.map((input) => (
            <div
              key={input.name}
              className={`${input.type === "hidden" ? "hidden" : ""} ${
                input.type === "file" ? "col-span-full" : ""
              }`}
            >
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {input.label}
                {input.required && <span className="text-red-500"> *</span>}
              </label>

              {input.options ? (
                <div className="relative">
                  <select
                    name={input.name}
                    id={input.name}
                    value={formData[input.name] || ""}
                    onChange={handleChange}
                    required={input.required}
                    className="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="" disabled>
                      {input.placeholder || "Select an option"}
                    </option>
                    {input.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ) : input.type === "file" ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400">
                        {formData[input.name]
                          ? typeof formData[input.name] === "string"
                            ? formData[input.name].split(
                                "prospectsPhotos/"
                              )[1] || formData[input.name]
                            : formData[input.name].name
                          : "Upload a file"}
                      </p>
                    </div>
                    <input
                      type="file"
                      name={input.name}
                      id={input.name}
                      onChange={handleChange}
                      className="opacity-0"
                    />
                  </label>
                </div>
              ) : (
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  value={formData[input.name] || ""}
                  onChange={handleChange}
                  required={input.required}
                  placeholder={input.placeholder}
                  className="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              )}
            </div>
          ))}
        </div>

        {/* Creative Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="relative px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl"
          >
            {/* Animated background */}
            <span
              className={`absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 transition-opacity duration-300 ${
                isButtonHovered ? "opacity-100" : "opacity-0"
              }`}
            ></span>

            {/* Button content */}
            <span className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <span>{submitButtonText}</span>
                  {/* Arrow icon that slides in on hover */}
                  <svg
                    className={`ml-2 w-5 h-5 transition-all duration-300 ${
                      isButtonHovered
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </>
              )}
            </span>

            {/* Shine effect on hover */}
            <span
              className={`absolute top-0 left-1/2 w-8 h-full -ml-12 bg-white opacity-10 transform -skew-x-12 transition-all duration-700 ${
                isButtonHovered ? "translate-x-96" : "-translate-x-20"
              }`}
            ></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
