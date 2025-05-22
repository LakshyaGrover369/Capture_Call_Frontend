import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import SubHeading from "../../components/SubHeading";

const AddAdmin = () => {
  const navigate = useNavigate();

  // Define your form inputs
  const formInputs = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter full name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter email address",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "Enter phone number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Enter password",
    },
    {
      name: "BatchNumber",
      label: "Batch Number",
      type: "text",
      required: true,
      placeholder: "Enter batch number",
    },
  ];

  // Success handler
  const handleSuccess = () => {
    alert("Admin added successfully!");
    // Navigate to admin list page after successful addition
    navigate("/admin/admin-details");
  };

  // Error handler
  const handleError = (error: any) => {
    const errorMessage = error.response?.data?.message || "Error adding admin";
    alert(errorMessage);
  };

  return (
    <div className=" w-full sm:p-4">
      <SubHeading className="text-center" text="Add New Admin" />
      <Form
        inputs={formInputs}
        submitRoute={`${import.meta.env.VITE_API_URL}/api/admin/create`}
        onSubmitSuccess={handleSuccess}
        onSubmitError={handleError}
      />
    </div>
  );
};

export default AddAdmin;
