import DashboardCard from "../../components/DashboardCard";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import total_prospects from "../../assets/svg/total_prospects.svg";
import regular_users from "../../assets/images/regular_users.png";
import admin from "../../assets/images/admin.png";
import CallingLoader from "../../assets/loaders/CallingLoader.gif";

const DashboardDetails = () => {
  interface DashboardData {
    totalMaleOpenBadge: number;
    totalFemaleOpenBadge: number;
    totalMalePermanentBadge: number;
    totalFemalePermanentBadge: number;
    totalMaleElderlyBadge: number;
    totalFemaleElderlyBadge: number;
    totalUsers: number;
    totalAdmins: number;
    totalRegularUsers: number;
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/getAdminDashboardData`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] w-full">
        <img src={CallingLoader} alt="Loading..." />
      </div>
    );
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const pieChartData = [
    {
      title: "Male vs Female Open Badge",
      data: [
        ["Gender", "Count"],
        ["Male", dashboardData.totalMaleOpenBadge],
        ["Female", dashboardData.totalFemaleOpenBadge],
      ],
    },
    {
      title: "Male vs Female Permanent Badge",
      data: [
        ["Gender", "Count"],
        ["Male", dashboardData.totalMalePermanentBadge],
        ["Female", dashboardData.totalFemalePermanentBadge],
      ],
    },
    {
      title: "Male vs Female Elderly Badge",
      data: [
        ["Gender", "Count"],
        ["Male", dashboardData.totalMaleElderlyBadge],
        ["Female", dashboardData.totalFemaleElderlyBadge],
      ],
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="">
          <DashboardCard
            title="Total Users"
            count={dashboardData.totalUsers}
            imageSrc={total_prospects}
            bgColor="bg-blue-500"
          />
        </div>
        <div className="">
          <DashboardCard
            title="Total Admins"
            count={dashboardData.totalAdmins}
            imageSrc={admin}
            bgColor="bg-green-500"
          />
        </div>
        <div className="">
          <DashboardCard
            title="Total Regular Users"
            count={dashboardData.totalRegularUsers}
            imageSrc={regular_users}
            bgColor="bg-yellow-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
        {pieChartData.map((chart, index) => (
          <div key={index} className="">
            <PieChart
              data={chart.data}
              options={{ title: chart.title, is3D: true }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDetails;
