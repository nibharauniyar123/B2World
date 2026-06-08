import { useState, useEffect } from "react";
import axios from "../utils/axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Legend,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LineChart,
  Line,
} from "recharts";
import { jsPDF } from "jspdf";
function Reports() {
  const [report, setReport] = useState(null);

useEffect(() => {
  loadReports();
}, []);

const loadReports = async () => {
  const res = await axios.get("/reports");

  setReport(res.data);
};
const openCount =
  report?.complaints?.filter(c => c.status === "OPEN").length || 0;

const resolvedCount =
  report?.complaints?.filter(c => c.status === "RESOLVED").length || 0;

const inProgressCount =
  report?.complaints?.filter(c => c.status === "IN_PROGRESS").length || 0;

  const complaintData = [
  {
    name: "Open",
    value: openCount,
  },
  {
    name: "In Progress",
    value: inProgressCount,
  },
  {
    name: "Resolved",
    value: resolvedCount,
  },
];
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 26000 },
  ];

  const expenseData = [
    { name: "Maintenance", value: 4000 },
    { name: "Security", value: 3000 },
    { name: "Cleaning", value: 2000 },
    { name: "Electricity", value: 5000 },
  ];
  const compareData = [
  {
    month: "Jan",
    revenue: 20000,
    expense: 10000,
  },

  {
    month: "Feb",
    revenue: 25000,
    expense: 12000,
  },

  {
    month: "Mar",
    revenue: 30000,
    expense: 15000,
  },
];
  const visitorData = [
  { month: "Jan", visitors: 40 },
  { month: "Feb", visitors: 55 },
  { month: "Mar", visitors: 70 },
  { month: "Apr", visitors: 90 },
];

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#f59e0b",
  ];
const flats = report?.flats || [];

const occupied = flats.filter(
  (f) => f.occupancyStatus === "OWNER_OCCUPIED"
).length;

const tenantOccupied = flats.filter(
  (f) => f.occupancyStatus === "TENANT_OCCUPIED"
).length;

const vacant = flats.filter(
  (f) => f.occupancyStatus === "VACANT"
).length;

return (
  <div className="stats-grid">

  <div className="card">
    <h3>Occupied Flats</h3>
    <p>{occupied}</p>
  </div>

  <div className="card">
    <h3>Vacant Flats</h3>
    <p>{vacant}</p>
  </div>

  <div className="card">
    <h3>Tenant Occupied</h3>
    <p>{tenantOccupied}</p>
  </div>

</div>
);
  const downloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Society Management Report", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Revenue: Rs ${report?.totalRevenue || 0}`,
    20,
    40
  );

  doc.text(
    `Expenses: Rs ${report?.totalExpense || 0}`,
    20,
    55
  );

  doc.text(
    `Complaints: ${report?.complaints?.length || 0}`,
    20,
    70
  );

  doc.text(
    `Visitors: ${report?.visitors?.length || 0}`,
    20,
    85
  );

  doc.text(
    `Open Complaints: ${openCount}`,
    20,
    105
  );

  doc.text(
    `Resolved Complaints: ${resolvedCount}`,
    20,
    120
  );

  doc.text(
    `In Progress Complaints: ${inProgressCount}`,
    20,
    135
  );

  doc.save("report.pdf");
};
  return (
    <div style={styles.container}>
      <h1>Reports & Analytics</h1>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Revenue</h3>
         <h2>Rs {report?.totalRevenue || 0}</h2>
        </div>

        <div style={styles.card}>
          <h3>Total Expenses</h3>
          <h2>Rs{report?.totalExpense || 0}</h2>
        </div>

        <div style={styles.card}>
          <h3>Complaints</h3>
          <h2>{report?.complaints?.length || 0}</h2>
        </div>

        <div style={styles.card}>
          <h3>Visitors</h3>
          <h2>{report?.visitors?.length || 0}</h2>
        </div>
      </div>
      <button
  onClick={downloadReport}
  style={{
    background: "#2563eb",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    marginBottom: "20px",
  }}
>
  Download Report
</button>
<div style={styles.chartBox}>
  <h2>Monthly Revenue</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={revenueData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="revenue"
        fill="#2563eb"
      />
    </BarChart>
  </ResponsiveContainer>
</div>

<div style={styles.chartBox}>
  <h2>Revenue vs Expense</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={compareData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="revenue"
        fill="#2563eb"
      />
      <Bar
        dataKey="expense"
        fill="#dc2626"
      />
    </BarChart>
  </ResponsiveContainer>
</div>
<div style={styles.chartBox}>
  <h2>Complaint Status</h2>
<ResponsiveContainer width="100%" height={350}>
  <PieChart>
    <Pie
      data={complaintData}
      dataKey="value"
      nameKey="name"
      outerRadius={120}
      label
    >
      <Pie
  data={complaintData}
  dataKey="value"
  nameKey="name"
  outerRadius={120}
  label={({name,value}) =>
    `${name}: ${value}`
  }
/>
      <Cell fill="#ff4d4f" />
      <Cell fill="#faad14" />
      <Cell fill="#52c41a" />
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
</div>
<div style={styles.chartBox}>
  <h2>Visitor Trend</h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >
    <BarChart data={compareData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="revenue"
        fill="#2563eb"
      />
     
    </BarChart>
  </ResponsiveContainer>
</div>    
      <div style={styles.chartBox}>
        <h2>Expense Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {expenseData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>
            <Tooltip />
          </PieChart>
          
{/* <PieChart width={400} height={300}>
  <Pie
    data={complaintData}
    cx="50%"
    cy="50%"
    outerRadius={100}
    dataKey="value"
    label
  >
    <Cell fill="#ef4444" />
    <Cell fill="#f59e0b" />
    <Cell fill="#22c55e" />
  </Pie>

  <Tooltip />
  <Legend />
</PieChart> */}
         </ResponsiveContainer> 
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "25px",
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  },

  chartBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  },
};

export default Reports;