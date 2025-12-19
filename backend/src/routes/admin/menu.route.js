const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../../controllers/admin/menu.controller');

const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, 'uploads/'),
filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', controller.getAdminMenu);
router.post('/', upload.single('image'), controller.addMenuItem);
router.put('/:id', upload.single('image'), controller.updateMenuItem);
router.delete('/:id', controller.deleteMenuItem);

module.exports = router;