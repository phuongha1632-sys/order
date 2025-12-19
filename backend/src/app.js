require('./config/env');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/client/menu', require('./routes/client/menu.route'));
app.use('/api/client/order', require('./routes/client/order.route'));
app.use('/api/admin/menu', require('./routes/admin/menu.route'));
app.use('/api/admin/order', require('./routes/admin/order.route'));
app.use('/api/admin/report', require('./routes/admin/report.route'));

module.exports = app;
