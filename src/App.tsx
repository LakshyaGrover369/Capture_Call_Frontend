// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/user/UserDashboard";
import UserDashboardDetails from "./pages/user/UserDashboardDetails";
import AddProspects from "./pages/user/AddProspects";
import NominalList from "./pages/user/NominalList";
import ProspectsDetails from "./pages/user/ProspectsDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDashboardDetails from "./pages/admin/AdminDashboardDetails";
import AddAdmin from "./pages/admin/AddAdmin";
import AdminDetails from "./pages/admin/AdminDetails";
import UserDetails from "./pages/admin/UserDetails";
import Footer from "./components/Footer";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/authentication">
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>

          {/* Admin routes with AdminDashboard as parent layout */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<AdminDashboardDetails />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path="user-details" element={<UserDetails />} />
            <Route path="admin-details" element={<AdminDetails />} />
          </Route>

          <Route path="/user" element={<UserDashboard />} >
            <Route path="dashboard" element={<UserDashboardDetails />} />
            <Route path="prospects-details" element={<ProspectsDetails />} />
            <Route path="add-prospects" element={<AddProspects />} />
            <Route path="nominal-list" element={<NominalList />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
