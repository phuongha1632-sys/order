const db = require("../config/database");

exports.getClientMenu = (req, res) => {
  const sql = `
        SELECT * 
        FROM menu 
        WHERE status != 'hidden'
        ORDER BY id DESC
    `;
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Lỗi lấy menu", error: err });

    const data = results.map(item => ({
      ...item,
      image: item.image
        ? `${req.protocol}://${req.get("host")}/uploads/${item.image}`
        : null
    }));

    res.json({ status: "success", data });
  });
};

exports.getAdminMenu = (req, res) => {
  const sql = `
        SELECT * 
        FROM menu 
        ORDER BY id DESC
    `;

  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Lỗi lấy menu", error: err });

    const data = results.map(item => ({
      ...item,
      image: item.image
        ? `${req.protocol}://${req.get("host")}/uploads/${item.image}`
        : null
    }));

    res.json({ status: "success", data });
  });
};

exports.addMenuItem = (req, res) => {
    const { name, price, status } = req.body;
    if (!name || !price) return res.status(400).json({ message: "Thiếu dữ liệu" });

    const imageName = req.file ? req.file.filename : null;

    const sql = `INSERT INTO menu (name, price, image, status) VALUES (?, ?, ?, ?)`;

    db.query(sql, [name, price, imageName, status || "available"], (err) => {
        if (err) return res.status(500).json({ message: "Lỗi thêm món" });

        res.json({ status: "success" });
    });
};

exports.updateMenuItem = (req, res) => {
    const { id } = req.params;
    const { name, price, status } = req.body;
    const newImage = req.file ? req.file.filename : null;

    if (!name || !price) return res.status(400).json({ message: "Thiếu dữ liệu" });

    const sqlGet = "SELECT image FROM menu WHERE id=?";
    db.query(sqlGet, [id], (err, rows) => {
        if (err || rows.length === 0) return res.status(500).json({ message: "Lỗi" });

        const oldImage = rows[0].image;
        const finalImage = newImage || oldImage;

        const sqlUpdate = `
            UPDATE menu 
            SET name=?, price=?, image=?, status=?
            WHERE id=?
        `;

        db.query(sqlUpdate, [name, price, finalImage, status || "available", id], (err2) => {
            if (err2) return res.status(500).json({ message: "Lỗi cập nhật" });

            res.json({ status: "success" });
        });
    });
};

exports.deleteMenuItem = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM menu WHERE id=?";

    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ message: "Lỗi xóa" });
        res.json({ status: "success" });
    });
};
