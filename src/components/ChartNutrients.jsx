import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const NutrientsChart = () => {
  // Dati esempio per nutrienti
  const data = [
    { nutrient: "Azoto (N)", value: 80 },
    { nutrient: "Fosforo (P)", value: 65 },
    { nutrient: "Potassio (K)", value: 90 },
    { nutrient: "Calcio (Ca)", value: 50 },
    { nutrient: "Magnesio (Mg)", value: 70 },
  ];

  return (
    <div className="bg-light p-3 rounded shadow">
      <h5 className="text-center mb-3">Plant Nutrients</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="nutrient" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutrientsChart;
