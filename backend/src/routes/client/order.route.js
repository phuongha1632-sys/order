const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/order.controller');

router.post('/', controller.createOrder);

module.exports = router;
