const calculateTotal = require('../../utils/calculateTotal');
const crypto = require('crypto');
const carts = {};

exports.createCart = (req, res) => {
  const cartId = crypto.randomUUID();

  carts[cartId] = {
    items: [],
    tableNumber: null
  };

  res.json({
    status: 'success',
    cartId
  });
};

exports.addItem = (req, res) => {
  const { cartId, menuId, menuName, price, quantity } = req.body;

  if (!carts[cartId]) {
    return res.status(404).json({ message: 'Cart không tồn tại' });
  }

  carts[cartId].items.push({
    menuId,
    menuName,
    price,
    quantity
  });

  res.json({ status: 'success' });
};

exports.getCurrentOrder = (req, res) => {
  const { cartId } = req.query;
  if (!carts[cartId]) {
    return res.status(404).json({ message: 'Cart không tồn tại' });
  }
  const items = carts[cartId].items;
  const displayItems = items.map((item, index) => ({
    stt: index + 1,
    menuName: item.menuName,
    quantity: item.quantity,
    price: item.price
  }));
  const totalBill = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  res.json({
    status: 'success',
    items: displayItems,
    totalBill
  });
};


exports.setTableNumber = (req, res) => {
  const { cartId, tableNumber } = req.body;
  if (!carts[cartId]) {
    return res.status(404).json({ message: 'Cart không tồn tại' });
  }
  carts[cartId].tableNumber = tableNumber;
  res.json({
    status: 'success',
    tableNumber
  });
};

exports._getCart = cartId => carts[cartId];
exports._clearCart = cartId => delete carts[cartId];
