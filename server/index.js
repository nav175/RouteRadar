const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
