import { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

interface Prospect {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  BatchNumber?: string;
  bloodGroup: string;
  adhaarCard: string;
  dateOfBirth: string;
  guardianName: string;
  guardianRelation: "father" | "husband";
  emergencyPhone: string;
  deptFinalisedByCenter: string;
  maritalStatus: string;
  doi: string;
  isInitiated: boolean;
  callResult: "selected" | "call back" | "not selected" | "not interested";
  callRecording: string;
  remarks: string;
  imageUrl: string; // New field for image URL
}

interface TableColumn {
  header: string;
  accessor: string;
  type?: "button" | "image";
  buttonText?: string;
  buttonAction?: string;
}

// const calculateAge = (dateOfBirth: string): number => {
//   const birthDate = new Date(dateOfBirth);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (
//     monthDiff < 0 ||
//     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//   ) {
//     age--;
//   }
//   return age;
// };

const ProspectsDetails = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);

  const columns: TableColumn[] = [
    {
      header: "Image",
      accessor: "imageUrl",
      type: "image",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Age",
      accessor: "age",
    },
    {
      header: "Address",
      accessor: "address",
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      header: "Batch Number",
      accessor: "BatchNumber",
    },
    {
      header: "Blood Group",
      accessor: "bloodGroup",
    },
    {
      header: "Adhaar Card",
      accessor: "adhaarCard",
    },
    {
      header: "Date of Birth",
      accessor: "dateOfBirth",
    },
    {
      header: "Guardian Name",
      accessor: "guardianName",
    },
    {
      header: "Relation",
      accessor: "guardianRelation",
    },
    {
      header: "Emergency Contact",
      accessor: "emergencyPhone",
    },
    {
      header: "Dept Finalised",
      accessor: "deptFinalisedByCenter",
    },
    {
      header: "Marital Status",
      accessor: "maritalStatus",
    },
    {
      header: "DOI",
      accessor: "doi",
    },
    {
      header: "Is Initiated",
      accessor: "isInitiated",
    },
    {
      header: "Call Result",
      accessor: "callResult",
    },
    {
      header: "Call Recording",
      accessor: "callRecording",
      type: "button",
      buttonText: "Play Recording",
      buttonAction: "/api/prospects/play-recording",
    },
    {
      header: "Remarks",
      accessor: "remarks",
    },
    {
      header: "Actions",
      accessor: "actions",
      type: "button",
      buttonText: "Update Status",
      buttonAction: "/api/prospects/update-status",
    },
  ];

  // // Sample data
  // const sampleData: Prospect[] = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     address: "123 Main St",
  //     phoneNumber: "1234567890",
  //     BatchNumber: "Batch-2024",
  //     bloodGroup: "O+",
  //     adhaarCard: "123456789012",
  //     dateOfBirth: "1995-05-15",
  //     guardianName: "Jim Doe",
  //     guardianRelation: "father",
  //     emergencyPhone: "9876543210",
  //     deptFinalisedByCenter: "IT",
  //     maritalStatus: "Single",
  //     doi: "2024-03-15",
  //     isInitiated: false,
  //     callResult: "selected",
  //     callRecording: "recording1.mp3",
  //     remarks: "Good candidate",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane Smith",
  //     address: "456 Oak St",
  //     phoneNumber: "9876543210",
  //     bloodGroup: "A+",
  //     adhaarCard: "987654321098",
  //     dateOfBirth: "1998-08-20",
  //     guardianName: "Robert Smith",
  //     guardianRelation: "husband",
  //     emergencyPhone: "1234567890",
  //     deptFinalisedByCenter: "HR",
  //     maritalStatus: "Married",
  //     doi: "2024-03-10",
  //     isInitiated: true,
  //     callResult: "call back",
  //     callRecording: "recording2.mp3",
  //     remarks: "Need to discuss salary",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  // ];

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/getAllProspects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        debugger;
        console.log(response.data.data);
        const mappedData = response.data.data.map((item: any) => ({
          id: item._id,
          age: item.AGE || "N/A",
          name: item.Sewadar_Name,
          address: item.Address || "N/A",
          phoneNumber: item.Phone_Number || "N/A",
          BatchNumber: item.Badge || "N/A",
          bloodGroup: item.Blood_Group || "N/A",
          adhaarCard: item.AADHAAR || "N/A",
          dateOfBirth: item.DOB || "N/A",
          guardianName: item.Father_Husband_Name || "N/A",
          guardianRelation: item.Gender === "Male" ? "father" : "husband",
          emergencyPhone: item.Emergency_Contact || "N/A",
          deptFinalisedByCenter: item.DEPT_FINALISED_BY_CENTER || "N/A",
          maritalStatus: item.Marital_Status || "N/A",
          doi: item.DOI || "N/A",
          isInitiated: (item.Is_Initiated || false) === true ? "Yes" : "No",
          callResult: item.Call_Result || "N/A",
          callRecording: item.Call_Recording || "N/A",
          remarks: item.Remarks || "N/A",
          imageUrl:
            item.Photo ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Ftyv350%2Fvegeta%2F&psig=AOvVaw0lfytmc9anQZF7YPbgAU--&ust=1745838105417000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJD4ifSH-IwDFQAAAAAdAAAAABAE",
        }));
        setProspects(mappedData);
      } catch (error) {
        console.error("Error fetching prospects:", error);
      }
    };

    fetchProspects();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Prospects Details</h2>
      <Table columns={columns} data={prospects} searchable={true} />
    </div>
  );
};

export default ProspectsDetails;
