// import Layout from "./components/Layout";
// import Users from "./pages/Users";

// function App() {

//   return (

//     <Layout>

//       <Users />

//     </Layout>

//   );

// }

// export default App;
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Layout({ children }) {

  return (

    <div className="flex h-screen">

      {/* Sidebar */}

      <div className="w-60 bg-gray-900 text-white p-5">

        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <ul className="space-y-3">

          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/societies">Societies</Link></li>
          <li><Link to="/flats">Flats</Link></li>
          <li><Link to="/complaints">Complaints</Link></li>
          <li><Link to="/visitors">Visitors</Link></li>
          <li><Link to="/notices">Notices</Link></li>
          <li><Link to="/maintenance">Maintenance</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>

        </ul>

      </div>

      {/* Main Area */}

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-6 bg-gray-100 flex-1">

          {children}

        </div>

      </div>

    </div>

  );

}