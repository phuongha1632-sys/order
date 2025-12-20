const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/order.controller');

router.get('/pending', controller.getPendingOrders);
router.get('/:orderId/items', controller.getOrderItems);
router.put('/:orderId/confirm', controller.confirmOrder);
router.put('/:orderId/cancel', controller.cancelOrder);

module.exports = router;
