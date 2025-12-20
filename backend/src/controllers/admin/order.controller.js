const db = require('../../config/database');

exports.getPendingOrders = (req, res) => {
  const sql = `
    SELECT
      id,
      table_number,
      order_date,
      total_price,
      payment_status
    FROM orders
    WHERE order_status = 'pending'
    ORDER BY order_date ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi lấy đơn pending' });
    }
    res.json({
      status: 'success',
      data: results
    });
  });
};

exports.getOrderItems = (req, res) => {
  const { orderId } = req.params;
  const sql = `
    SELECT 
      oi.id,
      m.name,
      oi.quantity,
      oi.price
    FROM order_items oi
    JOIN menu m ON oi.menu_id = m.id
    WHERE oi.order_id = ?
    ORDER BY oi.id ASC
  `;

  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi lấy chi tiết đơn' });
    }

    const items = results.map((item, index) => ({
      stt: index + 1,
      name: item.name,     
      quantity: item.quantity,
      price: item.price
    }));

    res.json({
      orderId,
      items
    });
  });
};

exports.confirmOrder = (req, res) => {
  const { orderId } = req.params;

  const sql = `
    UPDATE orders
    SET order_status = 'confirmed'
    WHERE id = ? AND order_status = 'pending'
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi xác nhận đơn' });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Đơn không tồn tại hoặc đã xử lý' });
    }

    res.json({
      status: 'success',
      orderId,
      order_status: 'confirmed'
    });
  });
};

exports.cancelOrder = (req, res) => {
  const { orderId } = req.params;
  const sql = `
    UPDATE orders
    SET order_status = 'canceled'
    WHERE id = ? AND order_status = 'pending'
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi hủy đơn' });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Đơn không tồn tại hoặc đã xử lý' });
    }

    res.json({
      status: 'success',
      orderId,
      order_status: 'canceled'
    });
  });
};
