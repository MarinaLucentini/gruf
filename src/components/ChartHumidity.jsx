import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer as PieContainer } from "recharts";

const MonitoringChart = () => {
  const [data, setData] = useState([]); // Per i dati dell'umidità
  const [lightData, setLightData] = useState([]); // Per i dati della luce
  const [aiResponse, setAiResponse] = useState(""); // Risposta dell'AI
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const [location, setLocation] = useState(null); // Posizione utente
  const [error, setError] = useState(null); // Messaggi di errore

  const XaiKey = "xai-OsuZMZ7nzrQzdriLDxZO58DeIpCuHUS2P4O116lKvUYyz3OThxwOYk4EU1YAarwpKUGV84wk1hY3cy7T"; // Chiave API AI
  const weatherApiKey = "2dc3ebc57ced0f63b2b40bdc3b316baf"; // Chiave API OpenWeatherMap
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Funzione per ottenere i dati meteo
  const fetchWeatherData = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`);

      if (!response.ok) throw new Error("Errore nel recupero dei dati climatici.");
      const weatherData = await response.json();

      // Estrai l'umidità corrente
      const currentHumidity = weatherData.main.humidity;

      // Simula dati per il grafico (umidità corrente e stimata per l'ora successiva)
      const chartData = [
        { time: "Now", moisture: currentHumidity },
        { time: "Next Hour", moisture: currentHumidity + Math.floor(Math.random() * 5 - 2) },
      ];
      setData(chartData);

      // Simula la distribuzione della luce basata su "clouds.all" (percentuale di nuvolosità)
      const lightPercent = 100 - weatherData.clouds.all; // Percentuale di luce
      const lightDistribution = [
        { name: "Zona Nord", value: lightPercent * 0.4 },
        { name: "Zona Est", value: lightPercent * 0.3 },
        { name: "Zona Sud", value: lightPercent * 0.2 },
        { name: "Zona Ovest", value: lightPercent * 0.1 },
      ];
      setLightData(lightDistribution);

      // Invia dati all'AI per suggerimenti sui raccolti
      const aiSuggestion = await fetchAIResponse(chartData, lightDistribution);
      setAiResponse(aiSuggestion);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
      setError("Errore durante il recupero dei dati meteo.");
      setData([]);
      setLightData([]);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per ottenere suggerimenti dall'AI
  const fetchAIResponse = async (soilData, lightData) => {
    try {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${XaiKey}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are Grok, an AI that suggests suitable crops based on soil and light conditions.",
            },
            {
              role: "user",
              content: `I have soil moisture data: ${JSON.stringify(soilData)} and light distribution data: ${JSON.stringify(
                lightData
              )}. Suggest suitable crops for each zone.`,
            },
          ],
          model: "grok-beta",
          stream: false,
          temperature: 0,
        }),
      });

      const result = await response.json();
      return result.choices[0]?.message?.content || "No response from AI.";
    } catch (error) {
      console.error("Errore nella chiamata API AI:", error);
      return "Errore durante il recupero dei suggerimenti AI.";
    }
  };

  // Ottieni la posizione dell'utente e avvia la catena di chiamate API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Errore nella geolocalizzazione:", error);
          setError("Impossibile ottenere la posizione dell'utente.");
        }
      );
    } else {
      setError("Geolocalizzazione non supportata nel browser.");
    }
  }, []);

  return (
    <div className="bg-light p-3 rounded shadow">
      <h5 className="text-center mb-3">Soil and Light Monitoring</h5>

      {loading ? (
        <p>Caricamento dati...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="moisture" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <PieContainer width="100%" height={300}>
            <PieChart>
              <Pie data={lightData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {lightData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </PieContainer>
          <div className="mt-3">
            <h6>AI Suggestions for Crops:</h6>
            <p>{aiResponse}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MonitoringChart;
