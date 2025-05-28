const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Important: allows backend to read JSON from frontend

// ✅ Test route from earlier
app.get("/api/message", (req, res) => {
  res.send("Hello from the backend!");
});

// ✅ New POST route to handle user input from React
app.post("/api/recommend", (req, res) => {
  const { from, to } = req.body;
  console.log("Received from frontend:", from, to);

  // Temporary dummy response
  res.json({ message: `✅ Got it! From ${from} to ${to}` });
});

// ✅ Start server
const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
