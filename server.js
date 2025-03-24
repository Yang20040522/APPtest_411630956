const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 建立資料庫連線
const db = mysql.createConnection({
    host: 'localhost',          // 資料庫主機（本機）
    user: 'root',               // 你的 MySQL 帳號
    password: '你的密碼',        // ⬅️ 改成你自己的密碼
    database: 'fin'             // 你的資料庫名稱
});

// ✅ 測試用 API：用條碼查詢商品
app.get('/product', (req, res) => {
    const barcode = req.query.barcode;
    const sql = 'SELECT * FROM products WHERE barcode = ?';
    db.query(sql, [barcode], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: '找不到商品' });
        res.json(result[0]);
    });
});

// ✅ 啟動伺服器
app.listen(3001, () => {
    console.log('✅ API 伺服器已啟動：http://localhost:3000');
});