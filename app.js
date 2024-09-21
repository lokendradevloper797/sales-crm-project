const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/salesCRM", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// Import Routes
// const customerRoutes = require('./routes/customerRoutes');
// app.use('/api/customers', customerRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Define the PORT
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
