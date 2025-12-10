require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

require("./config/database");

const menuRoutes = require("./routes/menu.routes");
app.use("/api/menu", menuRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
