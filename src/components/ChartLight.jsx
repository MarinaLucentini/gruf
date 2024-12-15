import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const LightDistributionChart = () => {
  const [aiResponse, setAiResponse] = useState("");

  // Dati esempio per la distribuzione della luce
  const data = [
    { name: "Zona Nord", value: 40 },
    { name: "Zona Est", value: 30 },
    { name: "Zona Sud", value: 20 },
    { name: "Zona Ovest", value: 10 },
  ];

  // Colori per il grafico
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Funzione per chiamare l'API Grok e ottenere suggerimenti
  const fetchAIResponse = async (lightData) => {
    try {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer xai-OsuZMZ7nzrQzdriLDxZO58DeIpCuHUS2P4O116lKvUYyz3OThxwOYk4EU1YAarwpKUGV84wk1hY3cy7T`, // Sostituisci con la tua chiave API
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are Grok, an AI that analyzes light distribution and suggests suitable crops.",
            },
            {
              role: "user",
              content: `I have light distribution data for the following zones: ${JSON.stringify(lightData)}. Please suggest suitable crops for each zone.`,
            },
          ],
          model: "grok-beta", // Sostituisci con il modello che stai utilizzando
          stream: false,
          temperature: 0,
        }),
      });

      const result = await response.json();
      console.log("AI Response:", result);
      return result.choices[0]?.message?.content; // Estrai la risposta suggerita
    } catch (error) {
      console.error("Errore nella chiamata API AI:", error);
      return "No response from AI.";
    }
  };

  // Recupera i suggerimenti dall'AI all'avvio
  useEffect(() => {
    const getAIResponse = async () => {
      const aiSuggestion = await fetchAIResponse(data);
      setAiResponse(aiSuggestion);
    };
    getAIResponse();
  }, []);

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
      <div className="mt-3">
        <h6>AI Suggestions for Crops:</h6>
        <p>{aiResponse}</p>
      </div>
    </div>
  );
};

export default LightDistributionChart;
