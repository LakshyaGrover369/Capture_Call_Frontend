import React, { useState } from "react";
import axios from "axios";

interface InputField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For dropdowns
  defaultValue?: any; // Optional default value
}

interface FormProps {
  inputs: InputField[];
  submitRoute: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: any) => void;
}

const Form: React.FC<FormProps> = ({
  inputs,
  submitRoute,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(() =>
    inputs.reduce((acc, input) => {
      if (input.defaultValue !== undefined) {
        acc[input.name] = input.defaultValue;
      }
      return acc;
    }, {} as { [key: string]: any })
  );

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
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      console.log("Form data to send:", formDataToSend); // Debugging line
      const response = await axios.post(submitRoute, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT manually set Content-Type for FormData
        },
        withCredentials: true, // 🔥 Needed for CORS when sending cookies or auth
      });

      console.log(response.data);
      if (onSubmitSuccess) onSubmitSuccess();
      setFormData({});
    } catch (error) {
      if (onSubmitError) onSubmitError(error);
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {inputs.map((input) => (
          <div
            key={input.name}
            className={`mb-4 ${input.type === "hidden" ? "hidden" : ""}`}
          >
            {input.type !== "hidden" && (
              <label
                htmlFor={input.name}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {input.label}
              </label>
            )}

            {input.options ? (
              <select
                name={input.name}
                id={input.name}
                value={formData[input.name] || ""}
                onChange={handleChange}
                required={input.required}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            ) : (
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                value={
                  input.type === "file" ? undefined : formData[input.name] || ""
                }
                onChange={handleChange}
                required={input.required}
                placeholder={input.placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}

            {input.type === "file" && formData[input.name] && (
              <div className="mt-2">
                Selected file:{" "}
                {typeof formData[input.name] === "string" ? (
                  <a
                    href={formData[input.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {formData[input.name].split("prospectsPhotos/")[1] ||
                      formData[input.name]}
                  </a>
                ) : (
                  <p className="text-sm text-gray-600">
                    Selected file: No File Selected
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[var(--primary-color)] hover:bg-[var(--Btn-hover)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
