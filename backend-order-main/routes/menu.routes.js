const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const menuController = require("../controllers/menu.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/client", menuController.getClientMenu);
router.get("/admin", menuController.getAdminMenu);
router.post("/", menuController.addMenuItem);
router.put("/:id", menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);
module.exports = router;
