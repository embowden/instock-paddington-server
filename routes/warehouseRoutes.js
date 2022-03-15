const express = require("express");
// const readFile = require("../utils/helper-functions");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readFile = (path) => {
  const content = JSON.parse(fs.readFileSync(path));
  return content;
};

// DELETE WAREHOUSE AND CORRESPONDING INVENTORY
router.delete("/:warehouseId", (req, res) => {
  const warehouseId = req.params.warehouseId;
  const warehouseData = readFile("./data/warehouses.json");
  let inventoryData = readFile("./data/inventories.json");
  console.log(warehouseId);

  const warehouse = warehouseData.find((object) => object.id == warehouseId);
  if (!warehouse) {
    res.status(400).json("Please provide a valid ID");
  }

  const warehouseIndex = warehouseData.find(
    (object) => object.id === warehouseId
  );

  const filteredInventories = inventoryData.filter(
    (object) => object.warehouseID != warehouse.id
  );

  warehouseData.splice(warehouseIndex, 1);
  inventoryData = filteredInventories;

  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouseData));
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));

  res.status(200).json("The following warehouse was deleted",warehouse);
});

module.exports = router;
