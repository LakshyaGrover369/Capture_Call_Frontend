import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiUpload,
  FiDownload,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Heading from "../../components/Heading";

const AddProspectsByExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [uploadErrors, setUploadErrors] = useState<
    { row: number; error: string }[]
  >([]);
  const [invalidExcelCloudinaryLink, setInvalidExcelCloudinaryLink] =
    useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setUploadMessage("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("ProspectsExcelData", file);
    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/addProspectByExcel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data;

      if (
        response.status === 200 &&
        responseData.message_id === "UPLOAD_SUCCESS"
      ) {
        setUploadMessage(responseData.message);
        setCreatedCount(responseData.createdCount || 0);
        setUploadErrors(responseData.errors || []);
        setInvalidExcelCloudinaryLink(responseData.cloudinaryLink || "");
      } else if (
        response.status === 200 &&
        responseData.message_id === "UPLOAD_FAILED"
      ) {
        setInvalidExcelCloudinaryLink(responseData.cloudinaryLink || "");
        setUploadMessage(
          "Failed to process file. Please check the error report."
        );
      } else {
        setUploadMessage("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("An error occurred while uploading the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Heading text="Upload Prospects via Excel" className="mb-6" />

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          Upload an Excel file to add multiple prospects at once. Ensure your
          file follows the required format.
        </p>
        <a
          href="https://res.cloudinary.com/dnsolpby4/raw/upload/v1746639865/static_sample_files/sample_prospect_data_cnuzur.xlsx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
        >
          <FiDownload className="mr-2" />
          Download Sample Format
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <FiUpload className="text-3xl text-gray-400" />
            <p className="text-gray-600">
              {isDragging
                ? "Drop your file here"
                : "Drag & drop your Excel file here or click to browse"}
            </p>
            <p className="text-sm text-gray-500">Supports .xlsx, .xls files</p>
          </div>
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FiUpload className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={!file || isUploading}
          className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
            !file || isUploading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } transition-colors`}
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            "Upload File"
          )}
        </button>
      </form>

      {/* Upload Status Messages */}
      {uploadMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-md ${
            uploadMessage.startsWith("✅") || uploadMessage.includes("success")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <div className="flex items-start">
            {uploadMessage.startsWith("✅") ||
            uploadMessage.includes("success") ? (
              <FiCheckCircle className="text-xl mr-3 mt-0.5 flex-shrink-0" />
            ) : (
              <FiAlertCircle className="text-xl mr-3 mt-0.5 flex-shrink-0" />
            )}
            <p>{uploadMessage.replace(/^❌\s*|^✅\s*/g, "")}</p>
          </div>
        </motion.div>
      )}

      {/* Success Summary */}
      {createdCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-green-50 text-green-700 rounded-md"
        >
          <div className="flex items-center">
            <FiCheckCircle className="text-xl mr-3 flex-shrink-0" />
            <p>
              Successfully added{" "}
              <span className="font-bold">{createdCount}</span> new prospects.
            </p>
          </div>
        </motion.div>
      )}

      {/* Invalid Excel Download */}
      {invalidExcelCloudinaryLink && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-yellow-50 text-yellow-700 rounded-md"
        >
          <div className="flex items-start">
            <FiAlertCircle className="text-xl mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-2">
                Some rows couldn't be processed
              </p>
              <p className="mb-2">
                Download the error report to see which rows need correction:
              </p>
              <a
                href={invalidExcelCloudinaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
              >
                <FiDownload className="mr-2" />
                Download Error Report
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Details */}
      {uploadErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 border border-red-100 rounded-md overflow-hidden"
        >
          <div className="bg-red-50 px-4 py-3 border-b border-red-100">
            <h4 className="font-medium text-red-700 flex items-center">
              <FiAlertCircle className="mr-2" />
              Upload Errors ({uploadErrors.length})
            </h4>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Row
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uploadErrors.map((error, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {error.row}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600">
                      {error.error}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddProspectsByExcel;
