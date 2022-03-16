const express = require("express");
const readFile = require("../utils/helper-functions");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = router;

// API to GET List of all Inventory Items
router.get("/", (req, res) => {
  const inventoryData = readFile("./data/inventories.json");
  if (!inventoryData) {
    res.status(404).json("Nothing found");
  } else {
    res.status(200).json(inventoryData);
  }
});

// API to GET a Single Inventory Item
router.get("/:inventoryId", (req, res) => {
  const inventoryData = readFile("./data/inventories.json");
  const inventoryId = req.params.inventoryId;
  const selectedInventoryItem = inventoryData.find(
    (item) => item.id === inventoryId
  );

  if (!selectedInventoryItem) {
    res.status(400).json("Please provide a valid inventory item ID");
  }
  res.status(200).json(selectedInventoryItem);
});

// API to GET Inventories for a Given Warehouse
router.get("/:warehouseId/inventory/:inventoryId", (req, res) => {
  const inventoryData = readFile("./data/inventories.json");
  const warehouseId = req.params.warehouseId;
  const inventoryId = req.params.inventoryId;

  const currWarehouse = inventoryData.find(
    (warehouse) => warehouse.warehouseID === warehouseId
  );
  if (!currWarehouse) {
    res.status(400).json("Please provide a valid Warehouse ID");
  }

  const currInventory = inventoryData.find(
    (inventory) => inventory.id === inventoryId
  );
  if (!currInventory) {
    res.status(400).json("Please provide a valid Inventory Item ID");
  }

  res.status(200).json(currInventory);
});


// API to POST/CREATE a New Inventory Item

// API to PUT/PATCH/EDIT an Inventory Item

// API to DELTE an Inventory Item
