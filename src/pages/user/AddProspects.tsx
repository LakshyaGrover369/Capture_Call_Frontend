import React from 'react';
import Form from '../../components/Form';

const AddProspects = () => {
  const formInputs = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter full name"
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
      placeholder: "Enter complete address"
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "Enter phone number"
    },
    {
      name: "mobileNumber",
      label: "Mobile Number",
      type: "tel",
      required: true,
      placeholder: "Enter mobile number"
    },
    {
      name: "BatchNumber",
      label: "Batch Number",
      type: "text",
      required: false,
      placeholder: "Enter batch number (optional)"
    },
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "text",
      required: true,
      placeholder: "Enter blood group"
    },
    {
      name: "adhaarCard",
      label: "Adhaar Card Number",
      type: "text",
      required: true,
      placeholder: "Enter 12-digit Adhaar number"
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true
    },
    {
      name: "guardianName",
      label: "Father's/Husband's Name",
      type: "text",
      required: true,
      placeholder: "Enter father's or husband's name"
    },
    {
      name: "guardianRelation",
      label: "Relation",
      type: "select",
      required: true,
      options: [
        { value: "father", label: "Father" },
        { value: "husband", label: "Husband" }
      ]
    },
    {
      name: "emergencyPhone",
      label: "Emergency Contact Number",
      type: "tel",
      required: true,
      placeholder: "Enter emergency contact number"
    },
    {
      name: "deptFinalisedByCenter",
      label: "Department Finalised",
      type: "text",
      required: true,
      placeholder: "Enter department"
    },
    {
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      required: true,
      options: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" }
      ]
    },
    {
      name: "doi",
      label: "Date of Initiation",
      type: "date",
      required: false
    },
    {
      name: "isInitiated",
      label: "Is Initiated",
      type: "select",
      required: true,
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
      ]
    }
  ];

  const handleSuccess = () => {
    alert('Prospect added successfully!');
    // Add any additional success handling (e.g., navigation)
  };

  const handleError = (error: any) => {
    alert('Error adding prospect: ' + error.message);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Prospect</h2>
      <Form 
        inputs={formInputs}
        submitRoute="/api/prospects/add"
        onSubmitSuccess={handleSuccess}
        onSubmitError={handleError}
      />
    </div>
  );
};

export default AddProspects;
