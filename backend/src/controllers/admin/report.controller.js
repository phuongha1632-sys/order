const db = require('../../config/database');
// lấy hiển thị doanh thu theo ngày trong tháng 
exports.getRevenue = (req, res) => {
const { month, year } = req.query;
const sql = `
SELECT DAY(order_date) day, SUM(total_price) total
FROM orders
WHERE MONTH(order_date)=? AND YEAR(order_date)=?  AND order_status = 'confirmed'
GROUP BY DAY(order_date)
`;
db.query(sql, [month, year], (err, rows) => {
if (err) return res.status(500).json({ message: 'Lỗi' });
res.json({ status: 'success', data: rows });
});
};
// lấy món bán chạy nhất trong tháng.
exports.getBestSeller = (req, res) => {
const sql = `
SELECT menu_name
FROM order_items
GROUP BY menu_name
ORDER BY SUM(quantity) DESC
LIMIT 1
`;
db.query(sql, (err, rows) => {
if (err) return res.status(500).json({ message: 'Lỗi' });
res.json({ status: 'success', data: rows[0] });
});
};
// tổng doanh thu của cả tháng nha
exports.getMonthRevenue = (req, res) => {
  const { month, year } = req.query;

  const sql = `
    SELECT SUM(total_price) AS month_total
    FROM orders
    WHERE MONTH(order_date) = ?
      AND YEAR(order_date) = ?
      AND order_status = 'confirmed'
  `;
  db.query(sql, [month, year], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Lỗi' });

    res.json({
      status: 'success',
      data: {
        monthTotal: rows[0].month_total 
      }
    });
  });
};
