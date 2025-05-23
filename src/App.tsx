import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// General Pages
const Home = lazy(() => import("./pages/General/Home"));
const AboutUs = lazy(() => import("./pages/General/AboutUs"));

// User Pages
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const UserDashboardDetails = lazy(
  () => import("./pages/user/UserDashboardDetails")
);
const AddProspects = lazy(() => import("./pages/admin/AddProspects"));
const EditProspectDetails = lazy(
  () => import("./pages/user/EditProspectDetails")
);
const AddProspectsByExcel = lazy(
  () => import("./pages/admin/AddProspectsByExcel")
);
const NominalList = lazy(() => import("./pages/user/NominalList"));
const ProspectsDetails = lazy(() => import("./pages/user/ProspectsDetails"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDashboardDetails = lazy(
  () => import("./pages/admin/AdminDashboardDetails")
);
const AddAdmin = lazy(() => import("./pages/admin/AddAdmin"));
const AdminDetails = lazy(() => import("./pages/admin/AdminDetails"));
const UserDetails = lazy(() => import("./pages/admin/UserDetails"));

// Auth Pages
const SignUp = lazy(() => import("./pages/authentication/SignUp"));
const SignIn = lazy(() => import("./pages/authentication/SignIn"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/" element={<Home />} />
          <Route path="/authentication">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

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
              element={<EditProspectDetails />}
            />
            <Route path="nominal-list" element={<NominalList />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
