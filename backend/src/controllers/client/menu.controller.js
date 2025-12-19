const db = require('../../config/database');


exports.getClientMenu = (req, res) => {
const sql = `
SELECT *
FROM menu
WHERE status != 'hidden'
ORDER BY id DESC
`;
db.query(sql, (err, results) => {
if (err)
return res.status(500).json({ message: 'Lỗi lấy menu', error: err });
const data = results.map(item => ({
...item,
image: item.image
? `${req.protocol}://${req.get('host')}/uploads/${item.image}`
: null
}));
res.json({ status: 'success', data });
});
};