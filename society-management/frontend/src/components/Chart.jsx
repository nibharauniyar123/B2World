import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart() {
  const data = [
    { name: "Users", value: 6 },
    { name: "Societies", value: 3 },
    { name: "Complaints", value: 4 },
    { name: "Bookings", value: 3 },
  ];

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;