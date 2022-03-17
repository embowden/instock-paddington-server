const express = require("express");
const readFile = require("../utils/helper-functions");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// const readFile = (path) => {
//   const content = JSON.parse(fs.readFileSync(path));
//   return content;
// };

/////---Warehouse Data GET---////
router.get("/", (req, res) => {
  const warehouseData = readFile("./data/warehouses.json");
  res.status(200).json(warehouseData);
});

///------GET Individual------///
router.get("/:id", (req, res) => {
  const warehouseContent = readFile("./data/warehouses.json");
  const selectedWarehouse = warehouseContent.find(
    (warehouse) => warehouse.id == req.params.id
  );
  res.status(200).json(selectedWarehouse);
});

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

  const warehouseIndex = warehouseData.findIndex(
    (object) => object.id === warehouseId
  );

  const filteredInventories = inventoryData.filter(
    (object) => object.warehouseID != warehouse.id
  );

  console.log(warehouseIndex);

  warehouseData.splice(warehouseIndex, 1);
  inventoryData = filteredInventories;

  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouseData));
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));

  res.status(200).json(warehouse);
});

module.exports = router;

//*CREATE-NEW-WAREHOUSE
router.post("/", (req, res) => {
  const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
  const newWarehouse = {
    id: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.contact.name,
      position: req.body.contact.position,
      phone: req.body.contact.phone,
      email: req.body.contact.email,
    },
  };

  warehouseData.push(newWarehouse);
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouseData));
  res.status(201).json(newWarehouse);
});

//*EDIT-WAREHOUSE
router.post("/:warehouseId", (req, res) => {
  const warehouseId = req.params.warehouseId;
  const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));

  const warehouse = warehouseData.find((object) => object.id == warehouseId);
  if (!warehouse) {
    res.status(400).json("Please provide a valid ID");
  }
  const editedWarehouse = { id: warehouseId, ...req.body };

  //* This function finds the index of the desired warehouse
  const findIndex = () => {
    for (let i = 0; warehouseData.length; i++) {
      if (warehouseData[i].id == warehouseId) {
        return i;
      }
    }
  };

  warehouseData.splice(findIndex(), 1, editedWarehouse);

  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouseData));
  res.status(201).json(warehouseData);
});
