

import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";


function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();

  }, []);

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <h1 className="text-2xl font-bold mb-6">
            Dashboard
          </h1>

          {stats && (


              <div className="grid grid-cols-4 gap-6">

 <Card title="Total Users" value="10"/>
 <Card title="Total Societies" value="3"/>
 <Card title="Complaints" value="5"/>
 <Card title="Notices" value="2"/>

 </div>

            // </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
