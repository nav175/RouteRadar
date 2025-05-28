import React, { useState } from 'react';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ from, to })
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error("Error sending to backend:", err);
      setResponse("❌ Could not connect to backend");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Route Radar</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>From: </label>
          <input value={from} onChange={(e) => setFrom(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>To: </label>
          <input value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>

        <button type="submit">Get Recommendation</button>
      </form>

      {response && <p style={{ marginTop: "2rem", fontSize: "1.2rem" }}>{response}</p>}
    </div>
  );
}

export default App;
