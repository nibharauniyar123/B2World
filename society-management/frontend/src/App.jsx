import { Routes,Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Societies from "./pages/Societies"
import UserDashboard from "./pages/UserDashboard";

import ProtectedRoute from "./components/ProtectedRoute"

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

  </Routes>

 )

}

export default App