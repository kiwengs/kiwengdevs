
let totalZakat = 0;
let currentUser = "";

// LOAD USER
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
        currentUser = savedUser;
    }
});

// LOGIN
function login() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    console.log("LOGIN DIKLIK:", username, password);

    if (!username || !password) {
        alert("Username dan password wajib diisi");
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Username atau password salah");
            return;
        }
    
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
    
        if (data.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }
    });
    
}



// NAVIGASI
function show(id) {
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

// HITUNG ZAKAT
function hitungZakat() {
    const penghasilan = document.getElementById("penghasilan").value;

    if (!penghasilan || penghasilan <= 0) {
        alert("Masukkan penghasilan yang valid");
        return;
    }

    totalZakat = penghasilan * 0.025;

    document.getElementById("hasilZakat").innerHTML =
        "Zakat yang harus dibayar: <b>Rp " +
        Number(totalZakat).toLocaleString("id-ID") +
        "</b>";
}

// BAYAR + INSERT + INVOICE
function bayar() {
    if (totalZakat <= 0) {
        alert("Hitung zakat terlebih dahulu");
        return;
    }

    // 🔥 PASTIKAN USER ADA
    if (!currentUser) {
        alert("User tidak terdeteksi, silakan login ulang");
        logout();
        return;
    }

    const metodeEl = document.getElementById("metode");
    if (!metodeEl) {
        alert("Metode pembayaran tidak ditemukan");
        return;
    }

    const metode = metodeEl.value;

    fetch("/pembayaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nama: currentUser,
            jumlah: totalZakat,
            metode: metode
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Server error");
        }
        return res.json();
    })
    .then(data => {
        if (data.success) {
            // =======================
            // TAMPILKAN INVOICE
            // =======================
            document.getElementById("invNama").innerText =
                "Nama: " + currentUser;

            document.getElementById("invJumlah").innerText =
                "Jumlah: Rp " + Number(totalZakat).toLocaleString("id-ID");

            document.getElementById("invMetode").innerText =
                "Metode: " + metode;

            show("invoice");
        } else {
            alert("Gagal menyimpan pembayaran");
        }
    })
    .catch(err => {
        console.error("Pembayaran error:", err);
        alert("Server tidak merespon");
    });
}


// download invoice 
function downloadInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nama = localStorage.getItem("username") || "person";
    const jumlah = Number(totalZakat).toLocaleString("id-ID");
    const metode = document.getElementById("metode").value;
    const tanggal = new Date().toLocaleDateString("id-ID");

    doc.setFontSize(16);
    doc.text("INVOICE PEMBAYARAN ZAKAT", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nama     : ${nama}`, 20, 40);
    doc.text(`Jumlah   : Rp ${jumlah}`, 20, 50);
    doc.text(`Metode   : ${metode}`, 20, 60);
    doc.text(`Tanggal  : ${tanggal}`, 20, 70);

    doc.text("-------------------------------------", 20, 90);
    doc.text("Terima kasih telah menunaikan zakat", 20, 100);
    doc.text("Semoga menjadi amal ibadah", 20, 110);


    doc.save(`invoice-zakat-${nama}.pdf`);
}


// LOGOUT 
function logout() {
    // hapus user login
    localStorage.removeItem("username");

    // kembali ke login page
    window.location.href = "index.html";
}

// =======================
// TAMPILAN LOGIN / REGISTER
// =======================
function showRegister() {
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById("register").classList.add("active");
}

function showLogin() {
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.querySelector("section").classList.add("active");
}

// =======================
// REGISTER
// =======================
function register() {
    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;

    if (!username || !password) {
        alert("Username dan password wajib diisi");
        return;
    }

    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Registrasi berhasil, silakan login");
            showLogin();
        } else {
            alert(data.message || "Registrasi gagal");
        }
    })
    .catch(err => {
        console.error("Register error:", err);
        alert("Server tidak merespon");
    });
}

//load berita
function loadBeritaUser() {
    fetch("http://localhost:3000/berita")
        .then(res => res.json())
        .then(data => {
            console.log("DATA BERITA:", data);

            const list = document.getElementById("beritaList");
            if (!list) {
                console.error("beritaList tidak ditemukan");
                return;
            }

            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = "<p>Belum ada berita.</p>";
                return;
            }

            data.forEach(b => {
                list.innerHTML += `
                    <div class="berita-item">
                        <h4>${b.judul}</h4>
                        <small>${new Date(b.tanggal).toLocaleDateString()}</small>
                        <p>${b.isi}</p>
                        <hr>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error("Gagal load berita:", err);
        });
}

//get berita
app.get("/berita/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "SELECT * FROM berita WHERE id = ?",
        [id],
        (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).json({ success: false });
            }
            res.json(result[0]);
        }
    );
});
//update berita
app.put("/berita/:id", (req, res) => {
    const id = req.params.id;
    const { judul, isi } = req.body;

    db.query(
        "UPDATE berita SET judul = ?, isi = ? WHERE id = ?",
        [judul, isi, id],
        err => {
            if (err) {
                return res.status(500).json({ success: false });
            }
            res.json({ success: true });
        }
    );
});

//delete berita
app.delete("/berita/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM berita WHERE id = ?",
        [id],
        err => {
            if (err) {
                return res.status(500).json({ success: false });
            }
            res.json({ success: true });
        }
    );
});

function loadPenyaluranDashboard() {
    fetch("http://localhost:3000/penyaluran")
        .then(res => res.json())
        .then(data => {
            const tabel = document.getElementById("tabelPenyaluran");
            if (!tabel) return;

            tabel.innerHTML = "";

            data.forEach(p => {
                tabel.innerHTML += `
                    <tr>
                        <td>${p.program}</td>
                        <td>${p.persentase}%</td>
                        <td>Rp ${Number(p.jumlah).toLocaleString("id-ID")}</td>
                    </tr>
                `;
            });
        });
}
