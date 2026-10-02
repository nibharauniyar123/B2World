import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function SuperAdminActivityLogs() {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] =
    useState(true);


  const fetchLogs = async () => {

    try {

      const token =
        localStorage.getItem("token");


      const response =
        await axios.get(
          `${API}/api/super-admin/activity-logs`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      setLogs(response.data);

    } catch (error) {

      console.error(
        "ACTIVITY LOG ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load activity logs"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchLogs();
  }, []);


  return (

    <div
      style={{
        padding: "40px",
      }}
    >

      <h1>
        Activity Logs
      </h1>

      <p>
        Monitor recent system activities.
      </p>


      {loading ? (

        <p>
          Loading activity logs...
        </p>

      ) : logs.length === 0 ? (

        <div>
          <h3>
            No activity logs available
          </h3>

          <p>
            System activities will appear here
            when users perform actions.
          </p>
        </div>

      ) : (

        <table
          width="100%"
          cellPadding="15"
        >

          <thead>

            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Date & Time</th>
            </tr>

          </thead>


          <tbody>

            {logs.map((log) => (

              <tr key={log.id}>

                <td>
                  {log.userName}
                </td>

                <td>
                  {log.action}
                </td>

                <td>
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}

export default SuperAdminActivityLogs;