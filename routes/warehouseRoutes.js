const express = require("express");
// const readFile = require("../utils/helper-functions");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = router;

//*CREATE-NEW-WAREHOUSE
router.post("/", (req, res) => {
  const warehouseData = JSON.parse(fs.readFileSync("./data/warehouses.json"));
  const newWarehouse = {
    id: uuidv4(),
    warehouseName: req.body.warehouseName,
    streetAdress: req.body.streetAdress,
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

router.get("/", (req, res) => {
  const warehouseDataContent = readFile("./data/warehouses.json");
  res.status(200).json(warehouseDataContent);
});
