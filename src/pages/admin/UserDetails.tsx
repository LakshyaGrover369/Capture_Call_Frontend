import { useState, useEffect } from 'react';
import Table from '../../components/Table';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  BatchNumber?: string;
  lastLogin: string;
}

const UserDetails = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Define table columns with correct type annotations
  const columns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name"
    },
    {
      header: "Email",
      accessor: "email"
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
      header: "Last Login",
      accessor: "lastLogin"
    },
    {
      header: "Actions",
      accessor: "actions",
      type: "button", // This must be exactly "button", not just string
      buttonText: "Delete User",
      buttonAction: `${import.meta.env.VITE_API_URL}/api/users/delete/`
    }
  ];

  // Sample data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">User Details</h2>
      <Table 
        columns={columns}
        data={users}
        searchable={true}
      />
    </div>
  );
};

// Add the TableColumn interface to the file
interface TableColumn {
  header: string;
  accessor: string;
  type?: "button";
  buttonText?: string;
  buttonAction?: string;
}

export default UserDetails;
