import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import admin_management from "../../assets/images/admin_management.png";
import bulk_upload from "../../assets/images/bulk_upload.png";
import real_time_insights from "../../assets/images/real_time_insights.png";

const Home = () => {
  const [dashboardLink, setDashboardLink] = useState<string>("");

  useEffect(() => {
    const authInfoStr = localStorage.getItem("authInfo");
    if (authInfoStr) {
      try {
        const authInfo = JSON.parse(authInfoStr);
        const isAuthenticated = authInfo?.isAuthenticated;
        const role = authInfo?.role;
        if (isAuthenticated && role === "admin") {
          setDashboardLink("/admin/dashboard");
        }
      } catch (e) {
        // Invalid JSON or missing fields
      }
    }
  }, []);

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col-reverse md:flex-row items-center justify-between px-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to Connect HQ
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Manage prospects, admins, and user insights easily. Get real-time
            dashboards with gender-based breakdowns, role statistics, and more.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link
              to={"/authentication/signin"}
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-blue-100 transition"
            >
              Get Started
            </Link>
            <Link
              to={"/about"}
              className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
          <div className="w-full h-full rounded-3xl overflow-hidden transform hover:scale-105 transition duration-700 ease-in-out">
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-aDHlZxJUYkcHL1CAJd0nv9ij/"
              frameBorder="0"
              className="w-full h-full"
              title="3D Interactive Model"
              allowFullScreen
              id="splineDiv"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-md transition">
            <img
              src={admin_management}
              className="mx-auto h-12 mb-4"
              alt="Admin"
            />
            <h3 className="text-xl font-semibold text-blue-700">
              Admin Management
            </h3>
            <p className="text-gray-600 mt-2">
              Easily add, view and manage administrators with full control and
              audit trails.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-md transition">
            <img
              src={real_time_insights}
              className="mx-auto h-12 mb-4"
              alt="Chart"
            />
            <h3 className="text-xl font-semibold text-blue-700">
              Real-Time Insights
            </h3>
            <p className="text-gray-600 mt-2">
              Visual charts and gender-wise stats for different user badges and
              roles.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-md transition">
            <img src={bulk_upload} className="mx-auto h-12 mb-4" alt="Excel" />
            <h3 className="text-xl font-semibold text-blue-700">Bulk Upload</h3>
            <p className="text-gray-600 mt-2">
              Import large datasets via Excel and automate prospect onboarding.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-700 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Explore the Admin Panel?
        </h2>
        <p className="text-lg mb-6">
          Start managing users and get instant analytics right from your
          dashboard.
        </p>
        <Link
          to={dashboardLink ?? alert("you are not an admin")}
          className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
        >
          Go to Dashboard
        </Link>
      </section>
    </main>
  );
};

export default Home;
