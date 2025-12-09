require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Import DB để kết nối ngay khi server khởi động
require("./config/database");
// Import routes
const menuRoutes = require("./routes/menu.routes");
app.use("/api/menu", menuRoutes);

// Route test
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Chạy server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
