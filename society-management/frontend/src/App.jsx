import { Routes,Route } from "react-router-dom"
import Layout from "./components/Layout"
import "./index.css"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Societies from "./pages/Societies"
import UserDashboard from "./pages/UserDashboard";
import Complaints from "./pages/Complaints";
import AdminComplaints from "./pages/AdminComplaints";
import ProtectedRoute from "./components/ProtectedRoute";
// import MyComplaints from "./pages/MyComplaints";
import Bookings from "./pages/Bookings";
import Flats from "./pages/Flats";
import Notices from "./pages/Notices";
import Visitors from "./pages/Visitors";
import Maintenance from "./pages/Maintenance";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Card from "./components/Card";
import Chart from "./components/Chart";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Upload from "./pages/Upload"; 
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments" 
import Expenses from "./pages/Expenses";
import Vendors from "./pages/Vendors";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings"
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import GuardDashboard from "./pages/GuardDashboard";
import AccountantDashboard from "./pages/AccountantDashboard";
import Parking from "./pages/Parking";
import KYCUpload from "./pages/KYCUpload";

function App(){

 return(

  <Routes>

   <Route path="/" element={<Login/>} />

   <Route
    path="/dashboard"
    element={
     <ProtectedRoute>
      <Dashboard/>
  </ProtectedRoute>
    }
   />
<Route path="/super-admin" element={
<ProtectedRoute>
<SuperAdminDashboard />
</ProtectedRoute>
} />

<Route path="/guard" element={
<ProtectedRoute>
<GuardDashboard />
</ProtectedRoute>
} />

<Route path="/accountant" element={
<ProtectedRoute>
<AccountantDashboard />
</ProtectedRoute>
} />
   <Route
    path="/users"
    element={
     <ProtectedRoute>
      <Users/>
     </ProtectedRoute>
    }
   />
   <Route
 path="/user"
 element={
  <ProtectedRoute>
   <UserDashboard/>
  </ProtectedRoute>
 }
/>
<Route
 path="/profile"
 element={
  <ProtectedRoute>
   <Profile />
  </ProtectedRoute>
 }
/>
<Route
 path="/settings"
 element={
  <ProtectedRoute>
   <Settings />
  </ProtectedRoute>
 }
/>
   <Route
    path="/societies"
    element={
     <ProtectedRoute>
      <Societies/>
     </ProtectedRoute>
    }
   />
   <Route path="/complaints" element={<Complaints />} />
   <Route path="/admin/complaints" element={<AdminComplaints />} />
   {/* <Route path="/my-complaints" element={<MyComplaints />} /> */}
   <Route path="/bookings" element={<Bookings />} />
   <Route path="/flats" element={<Flats />} />
   <Route path="/notices" element={<Notices />} />
   <Route path="/visitors" element={<Visitors />} />
   <Route path="/maintenance" element={<Maintenance />} />

   {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}  
   <Route path="/navbar" element={<Navbar />} />
   <Route path="/layout" element={<Layout />} />
<Route path="/register" element={<Register />} /> 
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route path="/card" element={<Card title="Test Card" value="123" color="#4ade80" />} />  
<Route path="/chart" element={<Chart />} />  
<Route path="/notifications" element={<Notifications />} />
<Route path="/reports" element={<Reports />} /> 
<Route path="/upload" element={<Upload />} /> 
<Route path="/invoices" element={<Invoices />} />
<Route path="/payments" element={<Payments />} />
<Route path="/expenses" element={<Expenses />} />
<Route path="/vendors" element={<Vendors />} />
<Route path="/parking" element={<Parking />} /> 
<Route path="/kyc-upload" element={<KYCUpload />} />
  </Routes>

 )

}

export default App

