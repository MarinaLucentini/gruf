import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // Importa fetch per fare richieste HTTP
import cors from "cors";

const app = express();
const PORT = 5000;

// Carica la chiave API dal file .env
const xAIKey = process.env.XAI_API_KEY;
if (!xAIKey) {
  console.error("API key is missing!");
  process.exit(1); // Terminare l'app se la chiave non è trovata
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint API
app.post("/api", async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ content: "No message provided!" });
    }

    // Definisci il corpo della richiesta da inviare all'API di x.ai
    const requestBody = {
      messages: [
        {
          role: "system",
          content: "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "grok-beta",
      stream: false,
      temperature: 0,
    };

    // Richiesta al servizio x.ai
    try {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${xAIKey}`, // Aggiungi il Bearer token per l'autenticazione
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Verifica che la risposta contenga la parte corretta
      if (data && data.choices && data.choices.length > 0) {
        const assistantResponse = data.choices[0].message.content;
        res.json({ query: userMessage, content: assistantResponse });
      } else {
        console.error("No valid response from the model.");
        return res.status(500).json({ error: "Error generating response." });
      }
    } catch (error) {
      console.error("Error during API call:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
