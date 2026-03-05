/* =========================
   PARALLAX BACKGROUND
========================= */
const gyroBg = document.querySelector('.gyro-bg');

if (gyroBg) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        gyroBg.style.transform =
            `translate(${-25 + x * 50}%, ${-25 + y * 50}%)`;
    });
}

/* =========================
   NAVIGATION DASHBOARD ONLY
========================= */
function show(id) {
    const sections = document.querySelectorAll("section");
    const nav = document.querySelector("nav");

    // ⛔ JIKA BUKAN DASHBOARD → STOP
    if (!nav || sections.length === 0) return;

    sections.forEach(sec => sec.classList.remove("active"));
    nav.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));

    const target = document.getElementById(id);
    if (target) target.classList.add("active");

    const btn = nav.querySelector(`button[onclick="show('${id}')"]`);
    if (btn) btn.classList.add("active");

    if (id === "berita" && typeof loadBeritaUser === "function") {
        loadBeritaUser();
    }
}

