import { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";
import CallingLoader from "../../assets/loaders/CallingLoader.gif";

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
  const [loading, setLoading] = useState(true);

  // Define table columns with correct type annotations
  const columns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
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
      header: "Last Login",
      accessor: "lastLogin",
    },
    {
      header: "Actions",
      accessor: "actions",
      type: "button", // This must be exactly "button", not just string
      buttonText: "Delete User",
      buttonAction: `${import.meta.env.VITE_API_URL}/api/users/delete/`,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/getAllUsers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(response.data.data)) {
          response.data.data = response.data.data.map((user: User) => ({
            ...user,
            lastLogin: user.lastLogin ? formatDateTime(user.lastLogin) : "",
          }));
        }

        function formatDateTime(dateString: string) {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");
          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <img src={CallingLoader} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">User Details</h2>
      <Table columns={columns} data={users} searchable={true} />
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
