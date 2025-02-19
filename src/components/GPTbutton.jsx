import { useState, useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
const GPTButton = () => {
  const [responses, setResponses] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Stato per memorizzare la posizione dell'utente
  const userInputRef = useRef();

  // Funzione per ottenere la posizione dell'utente
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude }); // Salva la posizione nel stato
        },
        () => {
          alert("Unable to retrieve your location.");
          setUserLocation(null); // Se l'utente non consente la geolocalizzazione
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setUserLocation(null); // Se la geolocalizzazione non è supportata
    }
  };

  const handleClick = async () => {
    const userMessage = userInputRef.current.value;

    if (!userMessage) {
      alert("Please enter a message.");
      return;
    }

    // Se la posizione non è stata ottenuta, chiedi all'utente di inserire la zona manualmente
    if (!userLocation) {
      alert("Please provide your location.");
      return;
    }

    try {
      // Corpo della richiesta
      const requestBody = {
        messages: [
          {
            role: "system",
            content:
              "You are Grok, a chatbot who helps users find suitable crops for their region. You should consider the user's location and suggest appropriate crops for that area. If the location is not specified, ask for it.",
          },
          {
            role: "user",
            content: userMessage,
          },
          {
            role: "system",
            content: "Please consider the user's location for the crop suggestions. If the location is not provided, prompt the user for it.",
          },
          {
            role: "user",
            content: `The user is asking about crops in the region of latitude: ${userLocation.latitude}, longitude: ${userLocation.longitude}.`,
          },
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0,
      };

      // Chiamata fetch direttamente all'API x.ai
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer xai-OsuZMZ7nzrQzdriLDxZO58DeIpCuHUS2P4O116lKvUYyz3OThxwOYk4EU1YAarwpKUGV84wk1hY3cy7T`, // Assicurati di impostare la tua chiave API nell'ambiente
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Response from server:", data); // Log per il debug

      if (data && data.choices && data.choices.length > 0) {
        const assistantResponse = data.choices[0].message.content;
        setResponses((prevResponses) => [...prevResponses, { query: userMessage, response: assistantResponse }]);
      } else {
        setResponses((prevResponses) => [...prevResponses, { query: userMessage, response: "No response from model." }]);
      }

      userInputRef.current.value = ""; // Clear the input after sending
    } catch (error) {
      console.error(error);
      setResponses((prevResponses) => [...prevResponses, { query: userMessage, response: "Error generating response." }]);
    }
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={getUserLocation}>
        Get Location
      </Button>

      <InputGroup className="mb-3">
        <Form.Control placeholder="Ask about crops" aria-label="Ask Grok" ref={userInputRef} />
        <Button variant="outline-secondary" onClick={handleClick}>
          Submit
        </Button>
      </InputGroup>

      <div id="responseBox" className="mt-3">
        {responses.map((item, index) => (
          <div key={index}>
            <div className="query toast" style={{ display: "block" }}>
              <div className="toast-body">{item.query}</div>
            </div>
            <div className="response toast" style={{ display: "block" }}>
              <div className="toast-body">{item.response}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GPTButton;
