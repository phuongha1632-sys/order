const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/order.controller');

router.post('/cart', controller.createCart);
router.post('/cart/add', controller.addItem);
router.get('/cart', controller.getCurrentOrder);
router.post('/cart/set-table', controller.setTableNumber);
module.exports = router;
