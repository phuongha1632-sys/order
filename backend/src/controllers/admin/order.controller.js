const db = require('../../config/database');
const calculateTotal = require('../../utils/calculateTotal');
const clientOrder = require('../client/order.controller');

exports.getOrders = (req, res) => {
  const sql = `
    SELECT
      id,
      table_number,
      order_date,
      total_price,
      payment_status
    FROM orders
    ORDER BY order_date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi lấy danh sách đơn' });
    }

    res.json({
      status: 'success',
      data: results
    });
  });
};

exports.confirmOrder = (req, res) => {
  const { tableNumber, paymentStatus } = req.body;

  const items = clientOrder._getCart(tableNumber);
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Không có đơn' });
  }

  const totalPrice = calculateTotal(items);

  const orderSql = `
    INSERT INTO orders (
      table_number,
      order_date,
      total_price,
      payment_status,
      order_status
    )
    VALUES (?, NOW(), ?, ?, 'confirmed')
  `;
  db.query(orderSql, [tableNumber, totalPrice, paymentStatus], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi tạo đơn hàng' });
    }

    const orderId = result.insertId;

    const orderItems = items.map(item => [
      orderId,
      item.menuName,
      item.quantity,
      item.price
    ]);

    const orderItemSql = `
      INSERT INTO order_items (order_id, menu_name, quantity, price)
      VALUES ?
    `;
    db.query(orderItemSql, [orderItems], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Lỗi tạo chi tiết đơn' });
      }

      clientOrder._clearCart(tableNumber);

      res.json({
        status: 'success',
        orderId,
        order_status: 'confirmed'
      });
    });
  });
};


exports.cancelOrder = (req, res) => {
  const { tableNumber } = req.body;
  clientOrder._clearCart(tableNumber);
  res.json({
    status: 'success',
    order_status: 'canceled'
  });
};
