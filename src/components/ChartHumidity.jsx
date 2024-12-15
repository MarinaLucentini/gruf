import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MonitoringChart = () => {
  const [data, setData] = useState([]);
  const [aiResponse, setAiResponse] = useState("");

  const fetchData = async () => {
    // Dati di esempio
    const moistureData = [
      { time: "10:00", moisture: 60 },
      { time: "11:00", moisture: 65 },
      { time: "12:00", moisture: 55 },
      { time: "13:00", moisture: 70 },
      { time: "14:00", moisture: 75 },
    ];
    setData(moistureData);

    // Chiamata al modello AI Grok per suggerire coltivazioni
    const aiSuggestion = await fetchAIResponse(moistureData);
    setAiResponse(aiSuggestion);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAIResponse = async (soilData) => {
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
              content: "You are Grok, an AI that suggests suitable crops for soil conditions.",
            },
            {
              role: "user",
              content: `I have soil moisture data: ${JSON.stringify(soilData)}. Suggest suitable crops.`,
            },
          ],
          model: "grok-beta",
          stream: false,
          temperature: 0,
        }),
      });

      const result = await response.json();
      console.log("AI Response:", result);
      return result.choices[0]?.message?.content; // Estrai il suggerimento
    } catch (error) {
      console.error("Errore nella chiamata API AI:", error);
      return "No response from AI.";
    }
  };

  return (
    <div className="bg-light p-3 rounded shadow">
      <h5 className="text-center mb-3">Soil Moisture and Crop Suggestions</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="moisture" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3">
        <h6>AI Suggestions for Crops:</h6>
        <p>{aiResponse}</p>
      </div>
    </div>
  );
};

export default MonitoringChart;
