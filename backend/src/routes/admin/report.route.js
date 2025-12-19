const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/report.controller');

router.get('/revenue', controller.getRevenue); // 1 ngày
router.get('/best-seller', controller.getBestSeller); // món bán chạy nhất 
router.get('/revenue/month', controller.getMonthRevenue); // doanh thu cả tháng

module.exports = router;