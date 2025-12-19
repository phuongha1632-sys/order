const mysql = require('mysql2');

const db = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Kết nối MySQL thất bại!");
    console.error(err.message);
  } else {
    console.log("Kết nối MySQL thành công!");
    connection.release(); 
  }
});
module.exports = db;