const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");

// API menu
router.get("/", menuController.getMenu);
router.post("/", menuController.addMenuItem);
router.put("/:id", menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);
module.exports = router;
