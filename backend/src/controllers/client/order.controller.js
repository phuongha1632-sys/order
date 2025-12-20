const db = require('../../config/database');

exports.createOrder = (req, res) => {
  const { tableNumber, paymentStatus, items } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Không có món trong đơn' });
  }
  
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const orderSql = `
    INSERT INTO orders (table_number, payment_status, order_status, total_price, order_date)
    VALUES (?, ?, 'pending', ?, NOW())
  `;
  
  db.query(orderSql, [tableNumber, paymentStatus, totalPrice], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi tạo đơn hàng' });
    const orderId = result.insertId;
    const orderItems = items.map(item => [orderId, item.menuId, item.quantity, item.price]);
    
    const orderItemSql = `
      INSERT INTO order_items (order_id, menu_id, quantity, price)
      VALUES ?
    `;
    db.query(orderItemSql, [orderItems], (err) => {
      if (err) return res.status(500).json({ message: 'Lỗi tạo chi tiết đơn' });
      res.json({
        status: 'success',
        orderId,
        order_status: 'pending',
        total_price: totalPrice
      });
    });
  });
};
