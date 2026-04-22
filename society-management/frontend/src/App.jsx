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

   <Route
    path="/users"
    element={
     <ProtectedRoute>
      <Users/>
     </ProtectedRoute>
    }
   />
   <Route
 path="/user-dashboard"
 element={
  <ProtectedRoute>
   <UserDashboard/>
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


  </Routes>

 )

}


export default App