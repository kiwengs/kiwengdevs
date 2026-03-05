const express = require("express");
const db = require("./koneksi/koneksi");
const cors = require("cors");
const path = require("path");

const app = express();

/* =====================
   MIDDLEWARE (WAJIB DI ATAS)
===================== */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* =====================
   PAGE
===================== */
app.use(express.json());
app.use(cors());

// index bebas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



/* =====================
   LOGIN
===================== */
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err, result) => {
            if (err) return res.status(500).json({ success: false });

            if (result.length > 0) {
                res.json({
                    success: true,
                    username: result[0].username,
                    role: result[0].role
                });
            } else {
                res.json({ success: false });
            }
        }
    );
});

/* =====================
   REGISTER
===================== */
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            success: false,
            message: "Data tidak lengkap"
        });
    }

    // cek username sudah dipakai
    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        (err, result) => {
            if (err) return res.status(500).json({ success: false });

            if (result.length > 0) {
                return res.json({
                    success: false,
                    message: "Username sudah digunakan"
                });
            }

            // INSERT + role default USER
            db.query(
                "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                [username, password, "user"],
                err => {
                    if (err)
                        return res.status(500).json({ success: false });

                    res.json({
                        success: true,
                        message: "Registrasi berhasil"
                    });
                }
            );
        }
    );
});


/* =====================
   BERITA (LENGKAP)
===================== */
app.get("/berita", (req, res) => {
    db.query("SELECT * FROM berita ORDER BY tanggal DESC", (err, result) => {
        if (err) return res.status(500).json([]);
        res.json(result);
    });
});

app.get("/berita/:id", (req, res) => {
    db.query(
        "SELECT * FROM berita WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err || result.length === 0)
                return res.status(404).json({ success: false });
            res.json(result[0]);
        }
    );
});

app.post("/berita", (req, res) => {
    const { judul, isi } = req.body;

    if (!judul || !isi)
        return res.status(400).json({ success: false });

    db.query(
        "INSERT INTO berita (judul, isi, tanggal) VALUES (?, ?, NOW())",
        [judul, isi],
        err => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        }
    );
});

app.put("/berita/:id", (req, res) => {
    const { judul, isi } = req.body;

    db.query(
        "UPDATE berita SET judul=?, isi=? WHERE id=?",
        [judul, isi, req.params.id],
        err => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        }
    );
});

app.delete("/berita/:id", (req, res) => {
    db.query(
        "DELETE FROM berita WHERE id=?",
        [req.params.id],
        err => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        }
    );
});

/* =====================
   PEMBAYARAN
===================== */
app.post("/pembayaran", (req, res) => {
    const { nama, jumlah, metode } = req.body;

    db.query(
        "INSERT INTO pembayaran (nama, jumlah, metode) VALUES (?, ?, ?)",
        [nama, jumlah, metode],
        err => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        }
    );
});

/* =====================
   START SERVER
===================== */
app.listen(3000, () => {
    console.log("🚀 Server jalan di http://localhost:3000");
});

// =======================
// PENYALURAN - GET (USER & DASHBOARD)
// =======================
app.get("/penyaluran", (req, res) => {
    db.query(
        "SELECT program, persentase, jumlah FROM penyaluran ORDER BY id ASC",
        (err, result) => {
            if (err) return res.status(500).json([]);
            res.json(result);
        }
    );
});

// =======================
// PENYALURAN - POST (ADMIN)
// =======================
app.post("/penyaluran", (req, res) => {
    const { program, persentase, jumlah } = req.body;

    db.query(
        "INSERT INTO penyaluran (program, persentase, jumlah) VALUES (?, ?, ?)",
        [program, persentase, jumlah],
        err => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        }
    );
});
