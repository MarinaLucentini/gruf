import { BrowserRouter, Route, Routes } from "react-router";
import React, { useState } from 'react';
import "./App.css";
import axios from 'axios';

import Dashboard from "./components/Dashboard";
import LandigPage from "./components/LandingPage";

function App() {
    const [response, setResponse] = useState('');

	const sendMessage = async () => {
        try {
            const res = await fetch('http://localhost:5000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Hello from React!' }),
            });
            const data = await res.json();
            setResponse(data.response);
			console.log(data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
	};

    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandigPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
