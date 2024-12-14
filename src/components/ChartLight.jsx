import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const LightDistributionChart = () => {
  // Dati esempio per la distribuzione della luce
  const data = [
    { name: "Zona Nord", value: 40 },
    { name: "Zona Est", value: 30 },
    { name: "Zona Sud", value: 20 },
    { name: "Zona Ovest", value: 10 },
  ];

  // Colori per il grafico
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-light p-3 rounded shadow">
      <h5 className="text-center mb-3">Light Distribution</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LightDistributionChart;
