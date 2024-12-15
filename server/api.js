import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import Anthropic from '@anthropic-ai/sdk';
import cors from 'cors';

const app = express();
const PORT = 5000;

const xAIKey = process.env['ANTHROPIC_API_KEY'];
const anthropicClient = new Anthropic({ apiKey: xAIKey, });
const anthropic = new Anthropic({
  apiKey: xAIKey,
  baseURL: "https://api.x.ai/",
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example API endpoint
app.post('/api', async (req, res) => {
  const { userMessage } = req.body;
  if (!userMessage) {
    return res.status(400).json({ content: 'No message provided!' });
  }
  const msg = await anthropic.messages.create({
	  model: "grok-beta",
	  max_tokens: 128,
	  system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
	  messages: [ {
		  role: "user",
		  content: userMessage,
	  }, ], });
	res.json({ query: userMessage, content: msg.content });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
