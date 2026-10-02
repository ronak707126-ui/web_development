const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

connectDB();

app.get("/", (req, res) => {
  res.send("E-commerce Backend is running");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});