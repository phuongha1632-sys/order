const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/order.controller');

router.get('/orders', controller.getOrders);
router.post('/order/confirm', controller.confirmOrder);
router.post('/order/cancel', controller.cancelOrder);

module.exports = router;
