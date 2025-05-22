import React, { useEffect, useState } from 'react';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:5050/api/message")
      .then(res => res.text())
      .then(data => setBackendMessage(data))
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontSize: "1.5rem" }}>
      <h1>Frontend-Backend Connection Test</h1>
      <p>{backendMessage ? `✅ ${backendMessage}` : "⏳ Loading..."}</p>
    </div>
  );
}

export default App;
