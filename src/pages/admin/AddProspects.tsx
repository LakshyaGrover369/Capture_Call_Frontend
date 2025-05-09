import Form from "../../components/Form";

const AddProspects = () => {
  const formInputs = [
    {
      name: "Sewadar_Name",
      label: "Sewadar Name",
      type: "text",
      required: true,
      placeholder: "Enter sewadar name",
    },
    {
      name: "Gender",
      label: "Gender",
      type: "select",
      required: true,
      options: ["Male", "Female", "Other"],
      placeholder: "Select gender",
    },
    {
      name: "AGE",
      label: "Age",
      type: "number",
      required: true,
      placeholder: "Enter age",
    },
    {
      name: "AADHAAR",
      label: "Aadhaar Number",
      type: "text",
      required: true,
      placeholder: "Enter Aadhaar number",
    },
    {
      name: "Address",
      label: "Address",
      type: "text",
      required: true,
      placeholder: "Enter address",
    },
    {
      name: "Phone_Number",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "Enter phone number",
    },
    {
      name: "Badge",
      label: "Badge Number",
      type: "text",
      required: true,
      placeholder: "Enter badge number",
    },
    {
      name: "Emergency_Contact",
      label: "Emergency Contact",
      type: "tel",
      required: true,
      placeholder: "Enter emergency contact number",
    },
    {
      name: "DOB",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "DEPT_FINALISED_BY_CENTER",
      label: "Department Finalised by Center",
      type: "text",
      required: true,
      placeholder: "Enter department finalised by center",
    },
    {
      name: "Marital_Status",
      label: "Marital Status",
      type: "select",
      required: true,
      options: ["Single", "Married", "Divorced", "Widowed"],
      placeholder: "Select marital status",
    },
    {
      name: "DOI",
      label: "Date of Initiation",
      type: "date",
      required: true,
    },
    {
      name: "Is_Initiated",
      label: "Is Initiated",
      type: "select",
      required: true,
      options: ["true", "false"],
      placeholder: "Select initiation status",
    },
    {
      name: "Badge_Status",
      label: "Badge Status",
      type: "select",
      required: true,
      options: ["Open", "Permanent", "Elderly"],
      placeholder: "Select badge status",
    },
    {
      name: "Photo",
      label: "Photo",
      type: "file",
      required: false,
      placeholder: "Upload photo",
    },
    {
      name: "Blood_Group",
      label: "Blood Group",
      type: "select",
      required: true,
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      placeholder: "Select blood group",
    },
    {
      name: "Father_Husband_Name",
      label: "Father's/Husband's Name",
      type: "text",
      required: true,
      placeholder: "Enter father's or husband's name",
    },
    {
      name: "Guardian_Relation",
      label: "Guardian Relation",
      type: "select",
      required: true,
      options: ["Father", "Husband"],
      placeholder: "Select guardian relation",
    },
  ];

  // const handleSubmit = async (formData: any) => {
  //   try {
  //     const data = new FormData();
  //     Object.keys(formData).forEach((key) => {
  //       data.append(key, formData[key]);
  //     });
  //     if (photo) {
  //       data.append("Photo", photo);
  //     }

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/users/addProspect`,
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     alert("Prospect added successfully!");
  //   } catch (error) {
  //     alert("Error adding prospect: " + error.message);
  //   }
  // };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Prospect</h2>
      <Form
        inputs={formInputs}
        submitRoute={`${import.meta.env.VITE_API_URL}/api/admin/addProspect`}
        onSubmitSuccess={() => alert("Prospect added successfully!")}
        onSubmitError={(error) =>
          alert("Error adding prospect: " + error.message)
        }
      />
    </div>
  );
};

export default AddProspects;
