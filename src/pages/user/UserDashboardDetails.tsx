import DashboardCard from "../../components/DashboardCard";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import SubHeading from "../../components/SubHeading";
import total_prospects from "../../assets/svg/total_prospects.svg";
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
      title: "Gender Distribution",
      data: [
        ["Gender", "Count"],
        ["Male", dashboardData?.prospectsWithGenderMale ?? 0],
        ["Female", dashboardData?.prospectsWithGenderFemale ?? 0],
      ],
      colors: ["#3b82f6", "#ec4899"], // Blue for male, Pink for female
    },
    {
      title: "Badge Type Distribution",
      data: [
        ["Badge Type", "Count"],
        ["Open Badge", dashboardData?.prospectsWithOpenBadge ?? 0],
        ["Permanent Badge", dashboardData?.prospectsWithPermanentBadge ?? 0],
        ["Elderly Badge", dashboardData?.prospectsWithElderlyBadge ?? 0],
      ],
      colors: ["#10b981", "#8b5cf6", "#f59e0b"], // Green, Purple, Amber
    },
  ];

  return (
    <div className="relative min-h-[300px] p-4 md:p-6 bg-gray-50">
      {!dashboardData && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-xl">
          <img src={CallingLoader} alt="Loading..." className="w-20 h-20" />
        </div>
      )}

      {dashboardData && (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <SubHeading text="User Dashboard" align="left" />
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <DashboardCard
              title="Total Prospects"
              count={dashboardData.totalProspects}
              imageSrc={total_prospects} // Recommended icon
              bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
            />
            <DashboardCard
              title="Yet To Call"
              count={dashboardData.prospectsWithCallResultNull}
              imageSrc="/icons/phone-missed.svg" // Recommended icon
              bgColor="bg-gradient-to-br from-rose-500 to-pink-600"
            />
            <DashboardCard
              title="Callback Needed"
              count={dashboardData.prospectsWithCallResultCallback}
              imageSrc="/icons/phone-callback.svg" // Recommended icon
              bgColor="bg-gradient-to-br from-amber-500 to-orange-600"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {pieChartData.map((chart, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {chart.title}
                </h3>
                <div className=" md:h-80">
                  <PieChart
                    data={chart.data}
                    options={{
                      title: "",
                      is3D: false,
                      pieHole: 0.3,
                      pieSliceText: "percentage",
                      slices: chart.data
                        .slice(1)
                        .map((_, i) => ({ color: chart.colors[i] })),
                      pieSliceTextStyle: {
                        fontSize: 14,
                        bold: true,
                        color: "#fff",
                      },
                      legend: {
                        position: "labeled",
                        textStyle: {
                          fontSize: 12,
                        },
                        alignment: "center",
                      },
                      chartArea: {
                        width: "100%",
                        height: "80%",
                      },
                      tooltip: {
                        showColorCode: true,
                      },
                      fontSize: 12,
                      colors: chart.colors,
                    }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {chart.data.slice(1).map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: chart.colors[i] }}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {item[0]}:{" "}
                        <span className="font-medium">{item[1]}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Detailed Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Gender Distribution
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Male</span>
                    <span className="font-medium">
                      {dashboardData.prospectsWithGenderMale} (
                      {Math.round(
                        (dashboardData.prospectsWithGenderMale /
                          dashboardData.totalProspects) *
                          100
                      )}
                      % )
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${
                          (dashboardData.prospectsWithGenderMale /
                            dashboardData.totalProspects) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-600">Female</span>
                    <span className="font-medium">
                      {dashboardData.prospectsWithGenderFemale} (
                      {Math.round(
                        (dashboardData.prospectsWithGenderFemale /
                          dashboardData.totalProspects) *
                          100
                      )}
                      % )
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500"
                      style={{
                        width: `${
                          (dashboardData.prospectsWithGenderFemale /
                            dashboardData.totalProspects) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Badge Type Distribution
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-600">Open Badge</span>
                    <span className="font-medium">
                      {dashboardData.prospectsWithOpenBadge}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">Permanent Badge</span>
                    <span className="font-medium">
                      {dashboardData.prospectsWithPermanentBadge}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">Elderly Badge</span>
                    <span className="font-medium">
                      {dashboardData.prospectsWithElderlyBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardDetails;
