const db = require('../../config/database');

exports.getOrder = (req, res) => {
  const { orderId } = req.params;
  const orderSql = `
    SELECT id, table_number, order_status, payment_status, total_amount, order_date
    FROM orders
    WHERE id = ?
  `;
  db.query(orderSql, [orderId], (err, orderResults) => {
    if (err) return res.status(500).json({ message: 'Lỗi lấy đơn hàng' });
    if (orderResults.length === 0) return res.status(404).json({ message: 'Đơn không tồn tại' });
    const order = orderResults[0];

    const itemsSql = `
      SELECT m.name, oi.quantity, oi.price
      FROM order_items oi
      JOIN menu m ON oi.menu_id = m.id
      WHERE oi.order_id = ?
      ORDER BY oi.id ASC
    `;
    db.query(itemsSql, [orderId], (err, itemsResults) => {
      if (err) return res.status(500).json({ message: 'Lỗi lấy chi tiết đơn' });
      const items = itemsResults.map((item, index) => ({
        stt: index + 1,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      res.json({
        status: 'success',
        order: {
          id: order.id,
          table_number: order.table_number,
          order_status: order.order_status,
          payment_status: order.payment_status,
          total_amount: order.total_amount,
          order_date: order.order_date,
          items
        }
      });
    });
  });
};
