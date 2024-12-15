import React, { useState, useEffect } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const NutrientsChart = () => {
  const [aiResponse, setAiResponse] = useState("");

  // Dati esempio per nutrienti
  const data = [
    { nutrient: "Azoto (N)", value: 80 },
    { nutrient: "Fosforo (P)", value: 65 },
    { nutrient: "Potassio (K)", value: 90 },
    { nutrient: "Calcio (Ca)", value: 50 },
    { nutrient: "Magnesio (Mg)", value: 70 },
  ];

  // Funzione per chiamare l'API Grok e ottenere suggerimenti
  const fetchAIResponse = async (nutrientData) => {
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
              content: "You are Grok, an AI that analyzes plant nutrient data and suggests improvements or suitable plants.",
            },
            {
              role: "user",
              content: `I have nutrient data for plants: ${JSON.stringify(nutrientData)}. Please suggest improvements or suitable plants.`,
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
      <div className="mt-3">
        <h6>AI Suggestions for Nutrient Management:</h6>
        <p>{aiResponse}</p>
      </div>
    </div>
  );
};

export default NutrientsChart;
