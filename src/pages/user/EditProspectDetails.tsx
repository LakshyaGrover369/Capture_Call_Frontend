import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import axios from "axios";
import CallingLoader from "../../assets/loaders/CallingLoader.gif";

const EditProspectDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [prospectData, setProspectData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProspectData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/GetProspect/${id}`, // Pass the id directly in the URL
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        setProspectData(response.data.data);
        console.log("Fetched prospect data:", response.data.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch prospect data."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProspectData();
    } else {
      setError("Invalid prospect ID.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <img
          src={CallingLoader}
          alt="Loading..."
          style={{ width: 80, height: 80 }}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!prospectData) {
    return <div>No prospect data found</div>;
  }

  const formInputs = [
    {
      name: "id",
      label: "id",
      type: "hidden",
      required: true,
      placeholder: "Enter id",
      defaultValue: prospectData?._id || "",
    },
    {
      name: "Sewadar_Name",
      label: "Sewadar Name",
      type: "text",
      required: true,
      placeholder: "Enter sewadar name",
      defaultValue: prospectData?.Sewadar_Name || "",
    },
    {
      name: "Gender",
      label: "Gender",
      type: "select",
      required: true,
      options: ["Male", "Female", "Other"],
      placeholder: "Select gender",
      defaultValue: prospectData?.Gender || "",
    },
    {
      name: "AGE",
      label: "Age",
      type: "number",
      required: true,
      placeholder: "Enter age",
      defaultValue: prospectData?.AGE || "",
    },
    {
      name: "AADHAAR",
      label: "Aadhaar Number",
      type: "text",
      required: true,
      placeholder: "Enter Aadhaar number",
      defaultValue: prospectData?.AADHAAR || "",
    },
    {
      name: "Address",
      label: "Address",
      type: "text",
      required: true,
      placeholder: "Enter address",
      defaultValue: prospectData?.Address || "",
    },
    {
      name: "Phone_Number",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "Enter phone number",
      defaultValue: prospectData?.Phone_Number || "",
    },
    {
      name: "Badge",
      label: "Badge Number",
      type: "text",
      required: true,
      placeholder: "Enter badge number",
      defaultValue: prospectData?.Badge || "",
    },
    {
      name: "Emergency_Contact",
      label: "Emergency Contact",
      type: "tel",
      required: true,
      placeholder: "Enter emergency contact number",
      defaultValue: prospectData?.Emergency_Contact || "",
    },
    {
      name: "DOB",
      label: "Date of Birth",
      type: "date",
      required: true,
      defaultValue: prospectData?.DOB
        ? new Date(prospectData.DOB).toISOString().split("T")[0]
        : "",
    },
    {
      name: "DEPT_FINALISED_BY_CENTER",
      label: "Department Finalised by Center",
      type: "text",
      required: true,
      placeholder: "Enter department finalised by center",
      defaultValue: prospectData?.DEPT_FINALISED_BY_CENTER || "",
    },
    {
      name: "Marital_Status",
      label: "Marital Status",
      type: "select",
      required: true,
      options: ["Single", "Married", "Divorced", "Widowed"],
      placeholder: "Select marital status",
      defaultValue: prospectData?.Marital_Status || "",
    },
    {
      name: "DOI",
      label: "Date of Initiation",
      type: "date",
      required: true,
      defaultValue: prospectData?.DOI
        ? new Date(prospectData.DOI).toISOString().split("T")[0]
        : "",
    },
    {
      name: "Is_Initiated",
      label: "Is Initiated",
      type: "select",
      required: true,
      options: ["true", "false"],
      placeholder: "Select initiation status",
      defaultValue: prospectData?.Is_Initiated?.toString() || "",
    },
    {
      name: "Badge_Status",
      label: "Badge Status",
      type: "select",
      required: true,
      options: ["Open", "Permanent", "Elderly"],
      placeholder: "Select badge status",
      defaultValue: prospectData?.Badge_Status || "",
    },
    {
      name: "Photo",
      label: "Photo",
      type: "file",
      required: false,
      placeholder: "Upload photo",
      defaultValue: prospectData?.Photo || "",
    },
    {
      name: "Blood_Group",
      label: "Blood Group",
      type: "select",
      required: true,
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      placeholder: "Select blood group",
      defaultValue: prospectData?.Blood_Group || "",
    },
    {
      name: "Father_Husband_Name",
      label: "Father's/Husband's Name",
      type: "text",
      required: true,
      placeholder: "Enter father's or husband's name",
      defaultValue: prospectData?.Father_Husband_Name || "",
    },
    {
      name: "Guardian_Relation",
      label: "Guardian Relation",
      type: "select",
      required: true,
      options: ["Father", "Husband"],
      placeholder: "Select guardian relation",
      defaultValue: prospectData?.Guardian_Relation || "",
    },
    {
      name: "Call_Result",
      label: "Call Result",
      type: "select",
      required: true,
      options: ["Not Interested", "Call Back", "Selected", "Others"],
      placeholder: "Select call result",
      defaultValue: prospectData?.Call_Result || "",
    },
    {
      name: "Remarks",
      label: "Remarks",
      type: "text",
      required: false,
      placeholder: "Enter remarks",
      defaultValue: prospectData?.Remarks || "",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Prospect Details
      </h2>
      <Form
        inputs={formInputs}
        submitRoute={`${import.meta.env.VITE_API_URL}/api/users/EditProspect`}
        onSubmitSuccess={() => alert("Prospect updated successfully!")}
        onSubmitError={(error) =>
          alert("Error updating prospect: " + error.message)
        }
      />
    </div>
  );
};

export default EditProspectDetails;
