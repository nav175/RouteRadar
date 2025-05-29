require('dotenv').config();
//console.log("✅ Loaded Gemini API Key:", process.env.GEMINI_API_KEY);

const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Allows backend to read JSON from frontend

// ✅ Basic Test Route
app.get("/api/message", (req, res) => {
  res.send("Hello from the backend!");
});

// ✅ Gemini AI Route
app.post("/api/ask-gemini", async (req, res) => {
  const { from, to, travelOptions } = req.body;

  const prompt = `
You are a smart travel assistant. The user wants to go from "${from}" to "${to}".
Here are their travel options:

${travelOptions.map(opt => `- ${opt.mode.toUpperCase()}: ${opt.duration} (${opt.distance})`).join("\n")}

Based on this, which mode is the best and why? Be short and clear in your answer.
`;

  try {
    const geminiResponse = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", // ✅ this line is key
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY  // ✅ must use this key header
        }
      }
    );
    console.log("🧠 Gemini raw response:", JSON.stringify(geminiResponse.data, null, 2));


    const message = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
    res.json({ message });

  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    res.status(500).json({ message: "Gemini API failed" });
  }
});


// ✅ Route Recommendation via Google Maps
app.post("/api/recommend", async (req, res) => {
  const { from, to } = req.body;

  try {
    const modes = ["driving", "transit", "walking"];
    const results = [];

    for (const mode of modes) {
      const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
        params: {
          origin: from,
          destination: to,
          mode: mode,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      });

      const leg = response.data.routes[0]?.legs[0];
      if (leg) {
        results.push({
          mode: mode,
          duration: leg.duration.text,
          distance: leg.distance.text
        });
      }
    }

    res.json({ results });

  } catch (error) {
    console.error("Google Maps error:", error.response?.data || error.message);
    res.status(500).json({ message: "Google Maps API failed" });
  }
});

// ✅ Start server
const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
