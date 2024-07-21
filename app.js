const express = require("express");
const model = require("./model");
const app = express();
const PORT = process.env.PORT || 3000;

// Route to handle GET request for boat by ID
app.get("/boat/:id", (req, res) => {
  const id = req.params.id;

  // Use the model's read method to fetch boat data
  model.boat.read(id, (err, data) => {
    if (err) {
      if (err.code === "E_NOT_FOUND") {
        res.status(404).json({ error: "Boat not found" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(200).json(data);
    }
  });
});

// Handle non-existent routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
