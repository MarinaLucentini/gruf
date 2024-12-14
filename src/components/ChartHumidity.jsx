import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MonitoringChart = () => {
  // Dati del grafico
  const data = [
    { time: "10:00", moisture: 60 },
    { time: "11:00", moisture: 65 },
    { time: "12:00", moisture: 55 },
    { time: "13:00", moisture: 70 },
    { time: "14:00", moisture: 75 },
  ];

  return (
    <div className="bg-light p-3 rounded shadow">
      <h5 className="text-center mb-3">Soil Moisture</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="moisture" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonitoringChart;
