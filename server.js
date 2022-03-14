const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const warehouseRoutes = require("./routes/warehouseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

app.use(express.json());
app.use(cors());
app.use("/warehouses", warehouseRoutes);
app.use("/inventory", inventoryRoutes);
// app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
