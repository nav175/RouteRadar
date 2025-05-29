import React, { useState } from 'react';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [response, setResponse] = useState([]); // travel options
  const [aiMessage, setAiMessage] = useState(''); // Gemini recommendation
  const [loading, setLoading] = useState(false);  // Optional loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse([]);
    setAiMessage('');

    try {
      // Step 1: Get travel options from backend
      const res = await fetch("http://localhost:5050/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to })
      });

      const data = await res.json();
      const travelOptions = data.results;

      if (!travelOptions || travelOptions.length === 0) {
        setResponse([]);
        setAiMessage("❌ No travel routes found.");
        setLoading(false);
        return;
      }

      // Step 2: Send to Gemini
      const geminiRes = await fetch("http://localhost:5050/api/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, travelOptions })
      });

      const geminiData = await geminiRes.json();
      console.log("🤖 Gemini message:", geminiData.message);

      // Step 3: Update frontend
      setResponse(travelOptions);
      setAiMessage(geminiData.message);
    } catch (err) {
      console.error("Error:", err);
      setAiMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
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

      {loading && <p style={{ marginTop: "1rem" }}>Loading travel options...</p>}

      {/* Travel Options */}
      {Array.isArray(response) && response.length > 0 && response.map((item, idx) => (
        <p key={idx} style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
          🚗 {item.mode.toUpperCase()}: {item.duration} ({item.distance})
        </p>
      ))}

      {/* Gemini Recommendation */}
      {aiMessage && (
        <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <strong>🤖 Gemini suggests:</strong>
          <p style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{aiMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
