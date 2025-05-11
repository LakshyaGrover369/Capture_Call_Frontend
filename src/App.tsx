import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import UserDashboard from "./pages/user/UserDashboard";
import UserDashboardDetails from "./pages/user/UserDashboardDetails";
import AddProspects from "./pages/admin/AddProspects";
import EditProspectDectails from "./pages/user/EditProspectDetails";

import AddProspectsByExcel from "./pages/admin/AddProspectsByExcel";
import NominalList from "./pages/user/NominalList";
import ProspectsDetails from "./pages/user/ProspectsDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDashboardDetails from "./pages/admin/AdminDashboardDetails";
import AddAdmin from "./pages/admin/AddAdmin";
import AdminDetails from "./pages/admin/AdminDetails";
import UserDetails from "./pages/admin/UserDetails";

import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/authentication">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Admin routes with AdminDashboard as parent layout */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<AdminDashboardDetails />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path="user-details" element={<UserDetails />} />
            <Route path="admin-details" element={<AdminDetails />} />
            <Route path="add-prospects" element={<AddProspects />} />
            <Route
              path="add-prospects-excel"
              element={<AddProspectsByExcel />}
            />
          </Route>

          <Route path="/user" element={<UserDashboard />}>
            <Route path="dashboard" element={<UserDashboardDetails />} />
            <Route path="prospects-details" element={<ProspectsDetails />} />
            <Route
              path="edit-prospect-details/:id"
              element={<EditProspectDectails />}
            />
            <Route path="nominal-list" element={<NominalList />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
