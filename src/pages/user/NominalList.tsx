import { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";
import CallingLoader from "../../assets/loaders/CallingLoader.gif";
import SubHeading from "../../components/SubHeading";
import DownloadButton from "../../components/DownloadButton";

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
  type?: "button" | "image" | "buttonNavigate";
  buttonText?: string;
  buttonAction?: string;
}

const NominalList = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableColumn[] = [
    {
      header: "id",
      accessor: "id",
    },
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
      header: "Remarks",
      accessor: "remarks",
    },
    {
      header: "Actions",
      accessor: "actions",
      type: "buttonNavigate",
      buttonText: "Edit Details",
      buttonAction: "/user/edit-prospect-details/",
    },
  ];

  const fetchProspectsExcelLink = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/getNominalListByExcel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.ExcelLink) {
        window.open(response.data.ExcelLink, "_blank"); // Trigger download
      } else {
        console.error("Excel link not found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching prospects Excel link:", error);
    }
  };

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/getNominalList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data -=> ", response.data.data);
        const formatDateTime = (dateString: string) => {
          if (!dateString) return "N/A";
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return "N/A";
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };
        const mappedData = response.data.data.map((item: any) => ({
          id: item._id,
          age: item.AGE || "N/A",
          name: item.Sewadar_Name,
          address: item.Address || "N/A",
          phoneNumber: item.Phone_Number || "N/A",
          BatchNumber: item.Badge || "N/A",
          bloodGroup: item.Blood_Group || "N/A",
          adhaarCard: item.AADHAAR || "N/A",
          dateOfBirth: formatDateTime(item.DOB) || "N/A",
          guardianName: item.Father_Husband_Name || "N/A",
          guardianRelation: item.Gender === "Male" ? "father" : "husband",
          emergencyPhone: item.Emergency_Contact || "N/A",
          deptFinalisedByCenter: item.DEPT_FINALISED_BY_CENTER || "N/A",
          maritalStatus: item.Marital_Status || "N/A",
          doi: formatDateTime(item.DOI) || "N/A",
          isInitiated: (item.Is_Initiated || false) === true ? "Yes" : "No",
          callResult: item.Call_Result || "N/A",
          callRecording: item.Call_Recording || "N/A",
          remarks: item.Remarks || "N/A",
          imageUrl: item.Photo || "https://via.placeholder.com/150",
        }));
        setProspects(mappedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prospects:", error);
        setLoading(false);
      }
    };

    fetchProspects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <img src={CallingLoader} alt="Loading..." />
      </div>
    );
  } else {
    return (
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <SubHeading text="Nominal List" align="left" />
          <DownloadButton onClick={fetchProspectsExcelLink} />
        </div>
        <Table columns={columns} data={prospects} searchable={true} />
      </div>
    );
  }
};

export default NominalList;
