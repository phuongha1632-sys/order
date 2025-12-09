const db = require("../config/database");

// Lấy menu
exports.getMenu = (req, res) => {
  const sql = "SELECT * FROM menu ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Lỗi lấy menu", error: err });

    res.json({ status: "success", data: results });
  });
};

// Thêm món
exports.addMenuItem = (req, res) => {
  const { name, price, image, status } = req.body;

  if (!name || !price)
    return res.status(400).json({ message: "Tên và giá không được để trống" });

  const sql = `
        INSERT INTO menu (name, price, image, status)
        VALUES (?, ?, ?, ?)
    `;

  db.query(sql, [name, price, image || "", status || "available"], (err) => {
    if (err)
      return res.status(500).json({ message: "Lỗi thêm món", error: err });

    res.json({ status: "success", message: "Thêm món thành công" });
  });
};

// Sửa món
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const { name, price, image, status } = req.body;

  if (!name || !price)
    return res.status(400).json({ message: "Tên và giá không được để trống" });

  const sql = `
        UPDATE menu 
        SET name=?, price=?, image=?, status=?
        WHERE id=?
    `;

  db.query(
    sql,
    [name, price, image || "", status || "available", id],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Lỗi cập nhật món", error: err });

      res.json({ status: "success", message: "Cập nhật món thành công" });
    }
  );
};

// Xóa món
exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM menu WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err)
      return res.status(500).json({ message: "Lỗi xóa món", error: err });

    res.json({ status: "success", message: "Xóa món thành công" });
  });
};
