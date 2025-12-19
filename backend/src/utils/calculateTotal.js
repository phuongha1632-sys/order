const calculateTotal = (items = []) => {
return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};

module.exports = calculateTotal;