import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import axios from 'axios';

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
  guardianRelation: 'father' | 'husband';
  emergencyPhone: string;
  deptFinalisedByCenter: string;
  maritalStatus: string;
  doi: string;
  isInitiated: boolean;
  callResult: 'selected' | 'call back' | 'not selected' | 'not interested';
  callRecording: string;
  remarks: string;
}

interface TableColumn {
  header: string;
  accessor: string;
  type?: "button";
  buttonText?: string;
  buttonAction?: string;
}

const ProspectsDetails = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);

  const columns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name"
    },
    {
      header: "Address",
      accessor: "address"
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber"
    },
    {
      header: "Batch Number",
      accessor: "BatchNumber"
    },
    {
      header: "Blood Group",
      accessor: "bloodGroup"
    },
    {
      header: "Adhaar Card",
      accessor: "adhaarCard"
    },
    {
      header: "Date of Birth",
      accessor: "dateOfBirth"
    },
    {
      header: "Guardian Name",
      accessor: "guardianName"
    },
    {
      header: "Relation",
      accessor: "guardianRelation"
    },
    {
      header: "Emergency Contact",
      accessor: "emergencyPhone"
    },
    {
      header: "Dept Finalised",
      accessor: "deptFinalisedByCenter"
    },
    {
      header: "Marital Status",
      accessor: "maritalStatus"
    },
    {
      header: "DOI",
      accessor: "doi"
    },
    {
      header: "Is Initiated",
      accessor: "isInitiated"
    },
    {
      header: "Call Result",
      accessor: "callResult"
    },
    {
      header: "Call Recording",
      accessor: "callRecording",
      type: "button",
      buttonText: "Play Recording",
      buttonAction: "/api/prospects/play-recording"
    },
    {
      header: "Remarks",
      accessor: "remarks"
    },
    {
      header: "Actions",
      accessor: "actions",
      type: "button",
      buttonText: "Update Status",
      buttonAction: "/api/prospects/update-status"
    }
  ];

  // Sample data
  const sampleData: Prospect[] = [
    {
      id: "1",
      name: "John Doe",
      address: "123 Main St",
      phoneNumber: "1234567890",
      BatchNumber: "Batch-2024",
      bloodGroup: "O+",
      adhaarCard: "123456789012",
      dateOfBirth: "1995-05-15",
      guardianName: "Jim Doe",
      guardianRelation: "father",
      emergencyPhone: "9876543210",
      deptFinalisedByCenter: "IT",
      maritalStatus: "Single",
      doi: "2024-03-15",
      isInitiated: false,
      callResult: "selected",
      callRecording: "recording1.mp3",
      remarks: "Good candidate"
    },
    {
      id: "2",
      name: "Jane Smith",
      address: "456 Oak St",
      phoneNumber: "9876543210",
      bloodGroup: "A+",
      adhaarCard: "987654321098",
      dateOfBirth: "1998-08-20",
      guardianName: "Robert Smith",
      guardianRelation: "husband",
      emergencyPhone: "1234567890",
      deptFinalisedByCenter: "HR",
      maritalStatus: "Married",
      doi: "2024-03-10",
      isInitiated: true,
      callResult: "call back",
      callRecording: "recording2.mp3",
      remarks: "Need to discuss salary"
    }
  ];

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        // Uncomment and modify when API is ready
        // const response = await axios.get('/api/prospects');
        // setProspects(response.data);
        setProspects(sampleData);
      } catch (error) {
        console.error('Error fetching prospects:', error);
      }
    };

    fetchProspects();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Prospects Details</h2>
      <Table 
        columns={columns}
        data={prospects}
        searchable={true}
      />
    </div>
  );
};

export default ProspectsDetails;
