const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");

// API menu
router.get("/client", menuController.getClientMenu);
router.get("/admin", menuController.getAdminMenu);
router.post("/", menuController.addMenuItem);
router.put("/:id", menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);
module.exports = router;
