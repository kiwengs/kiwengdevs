// ==============================
// GLOBAL STATE
// ==============================
let beritaEditId = null;

// ==============================
// MODE SWITCH
// ==============================
function setMode(mode) {
    document.getElementById("btnBerita").classList.remove("active");
    document.getElementById("btnPenyaluran").classList.remove("active");

    document.getElementById("beritaSection").classList.remove("active");
    document.getElementById("penyaluranSection").classList.remove("active");

    if (mode === "berita") {
        document.getElementById("btnBerita").classList.add("active");
        document.getElementById("beritaSection").classList.add("active");
        beritaEditId = null;
        loadBeritaAdmin();
    }

    if (mode === "penyaluran") {
        document.getElementById("btnPenyaluran").classList.add("active");
        document.getElementById("penyaluranSection").classList.add("active");
        loadPenyaluranAdmin(); // 🔥 load data saat dibuka
    }
}

// ==============================
// LOGOUT
// ==============================
function logout() {
    window.location.href = "index.html";
}

// ==============================
// BERITA
// ==============================
function loadBeritaAdmin() {
    fetch("http://localhost:3000/berita")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("listBerita");
            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = "<p>Belum ada berita.</p>";
                return;
            }

            data.forEach(b => {
                list.innerHTML += `
                    <div class="item">
                        <h4>${b.judul}</h4>
                        <small>${new Date(b.tanggal).toLocaleDateString()}</small>
                        <p>${b.isi}</p>
                        <button onclick="editBerita(${b.id})">✏️ Edit</button>
                        <button onclick="hapusBerita(${b.id})">🗑️ Hapus</button>
                    </div>
                `;
            });
        });
}

function tambahBerita() {
    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;

    if (!judul || !isi) {
        alert("Judul dan isi wajib diisi");
        return;
    }

    fetch("http://localhost:3000/berita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul, isi })
    }).then(() => {
        alert("Berita ditambahkan");
        document.getElementById("judul").value = "";
        document.getElementById("isi").value = "";
        loadBeritaAdmin();
    });
}

function editBerita(id) {
    fetch(`http://localhost:3000/berita/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("judul").value = data.judul;
            document.getElementById("isi").value = data.isi;
            beritaEditId = id;
        });
}

function hapusBerita(id) {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;

    fetch(`http://localhost:3000/berita/${id}`, { method: "DELETE" })
        .then(() => loadBeritaAdmin());
}

// ==============================
// PENYALURAN
// ==============================

function tambahPenyaluran() {
    const program = document.getElementById("program").value.trim();
    const persentase = document.getElementById("persentase").value;
    const jumlah = document.getElementById("jumlah").value;

    if (!program || !persentase || !jumlah) {
        alert("Semua field wajib diisi");
        return;
    }

    fetch("http://localhost:3000/penyaluran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program, persentase, jumlah })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Gagal menyimpan data");
            return;
        }

        document.getElementById("program").value = "";
        document.getElementById("persentase").value = "";
        document.getElementById("jumlah").value = "";

        loadPenyaluranAdmin();
    })
    .catch(err => {
        console.error(err);
        alert("Terjadi kesalahan server");
    });
}

function loadPenyaluranAdmin() {
    const list = document.getElementById("listPenyaluran");

    // loading state
    list.innerHTML = `<div class="empty">Memuat data...</div>`;

    fetch("http://localhost:3000/penyaluran")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";

            if (!data || data.length === 0) {
                list.innerHTML = `
                    <div class="empty">
                        Belum ada data penyaluran
                    </div>
                `;
                return;
            }

            data.forEach((p, i) => {
                list.insertAdjacentHTML("beforeend", `
                    <div class="penyaluran-item">
                        <div class="penyaluran-header">
                            <span class="no">${i + 1}.</span>
                            <span class="program">${escapeHTML(p.program)}</span>
                        </div>
                        <div class="penyaluran-detail">
                            <span>Persentase : <b>${p.persentase}%</b></span>
                            <span>Dana : <b>Rp ${Number(p.jumlah).toLocaleString("id-ID")}</b></span>
                        </div>
                    </div>
                `);
            });
        })
        .catch(err => {
            console.error(err);
            list.innerHTML = `<div class="empty">Gagal memuat data</div>`;
        });
}

function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


function loadPenyaluranAdmin() {
    fetch("http://localhost:3000/penyaluran")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("listPenyaluran");
            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = `
                    <div class="empty">
                        Belum ada data penyaluran
                    </div>
                `;
                return;
            }

            data.forEach((p, i) => {
                list.innerHTML += `
                    <div class="penyaluran-item">
                        <div class="penyaluran-header">
                            <span class="no">${i + 1}.</span>
                            <span class="program">${p.program}</span>
                        </div>
                        <div class="penyaluran-detail">
                            <span>Persentase : <b>${p.persentase}%</b></span>
                            <span>Dana Yang Disumbangkan : <b>Rp ${Number(p.jumlah).toLocaleString("id-ID")}</b></span>
                        </div>
                    </div>
                `;
            });
        });
}


// ==============================
// DEFAULT
// ==============================
window.onload = () => {
    setMode("berita");
};
