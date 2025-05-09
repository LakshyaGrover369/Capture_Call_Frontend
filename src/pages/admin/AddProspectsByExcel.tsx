import React, { useState } from "react";
import Heading from "../../components/Heading";
import axios from "axios";

const AddProspectsByExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [createdCount, setCreatedCount] = useState<number>(0);
  const [uploadErrors, setUploadErrors] = useState<
    { row: number; error: string }[]
  >([]);
  const [invalidExcelCloudinaryLink, setInvalidExcelCloudinaryLink] =
    useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setUploadMessage("❌ Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("ProspectsExcelData", file);

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
        setUploadMessage(`✅ ${responseData.message}`);
        setCreatedCount(responseData.createdCount || 0);
        setUploadErrors(responseData.errors || []);
        setInvalidExcelCloudinaryLink(responseData.cloudinaryLink || "");
      } else if (
        response.status === 200 &&
        responseData.message_id === "UPLOAD_FAILED"
      ) {
        console.log(responseData.cloudinaryLink);
        setInvalidExcelCloudinaryLink(responseData.cloudinaryLink || "");
        setUploadMessage("❌ Failed to upload file.");
      } else {
        setUploadMessage("❌ Failed to upload file.");
      }
      console.log("Rendering link:", invalidExcelCloudinaryLink);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("❌ An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <Heading text="Upload Excel" />
      <p>
        📄 Download Format:{" "}
        <a
          href="https://res.cloudinary.com/dnsolpby4/raw/upload/v1746639865/static_sample_files/sample_prospect_data_cnuzur.xlsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to download the format
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {uploadMessage && <p>{uploadMessage}</p>}

      {createdCount > 0 && (
        <p>✅ {createdCount} new prospects successfully added.</p>
      )}

      {invalidExcelCloudinaryLink && (
        <p>
          📥 Download Invalid Excel File:{" "}
          <a
            href={invalidExcelCloudinaryLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {invalidExcelCloudinaryLink}
          </a>
        </p>
      )}

      {uploadErrors.length > 0 && (
        <div>
          <h4>⚠️ Upload Errors:</h4>
          <ul>
            {uploadErrors.map((error, idx) => (
              <li key={idx}>
                Row {error.row}: {error.error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddProspectsByExcel;
