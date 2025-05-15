import DashboardCard from "../../components/DashboardCard";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import CallingLoader from "../../assets/loaders/CallingLoader.gif";

const UserDashboardDetails = () => {
  interface UserDashboardData {
    totalProspects: number;
    prospectsWithCallResultNull: number;
    prospectsWithCallResultCallback: number;
    prospectsWithOpenBadge: number;
    prospectsWithPermanentBadge: number;
    prospectsWithElderlyBadge: number;
    prospectsWithGenderFemale: number;
    prospectsWithGenderMale: number;
  }

  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(
    null
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/getUserDashboardData`,
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
      }
    };

    fetchDashboardData();
  }, []);

  const pieChartData = [
    {
      title: "Male vs Female Prospects",
      data: [
        ["Gender", "Count"],
        ["Male", dashboardData?.prospectsWithGenderMale ?? 0],
        ["Female", dashboardData?.prospectsWithGenderFemale ?? 0],
      ],
    },
    {
      title: "Prospects by Badge Type",
      data: [
        ["Badge Type", "Count"],
        ["Open Badge", dashboardData?.prospectsWithOpenBadge ?? 0],
        ["Permanent Badge", dashboardData?.prospectsWithPermanentBadge ?? 0],
        ["Elderly Badge", dashboardData?.prospectsWithElderlyBadge ?? 0],
      ],
    },
  ];

  return (
    <div className="relative min-h-[300px]">
      {!dashboardData && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-80 z-10">
          <img src={CallingLoader} alt="Loading..." />
        </div>
      )}
      {dashboardData && (
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[calc(30%-0.75rem)]">
            <DashboardCard
              title="Total Prospects"
              count={dashboardData.totalProspects}
              imageSrc="/icons/prospects.svg"
              bgColor="bg-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[calc(30%-0.75rem)]">
            <DashboardCard
              title="Prospects Yet To Call"
              count={dashboardData.prospectsWithCallResultNull}
              imageSrc="/icons/call-null.svg"
              bgColor="bg-red-500"
            />
          </div>
          <div className="flex-1 min-w-[calc(30%-0.75rem)]">
            <DashboardCard
              title="Prospects To Callback"
              count={dashboardData.prospectsWithCallResultCallback}
              imageSrc="/icons/callback.svg"
              bgColor="bg-yellow-500"
            />
          </div>
          {pieChartData.map((chart, index) => (
            <div key={index} className="flex-1 min-w-[calc(30%-0.75rem)]">
              <PieChart
                data={chart.data}
                options={{ title: chart.title, is3D: true }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboardDetails;
