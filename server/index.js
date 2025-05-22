const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get("/api/message", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
