document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    loadQuiz();
});

// --- DATA CADANGAN (HARDCODED) ---
// Ini akan dipakai jika fetch JSON gagal (seperti kasus "undefined" di Acode)
const fallbackData = {
    logo_type: "image",       // Pilih 'image' atau 'text'
    logo_content: "logo.webp", // Pastikan nama file gambar benar!
    welcome_title: "Fisika Tanpa Batas",
    welcome_desc: "Eksplorasi materi fisika dengan antarmuka Liquid Glass yang modern."
};

async function loadConfig() {
    let data = fallbackData; // Default pakai cadangan dulu

    try {
        const response = await fetch('settings.json');
        if (response.ok) {
            data = await response.json(); // Jika sukses, timpa dengan data JSON
        }
    } catch (err) {
        console.log("Mode Offline/Acode: Menggunakan data fallback.");
    }

    applyDataToHTML(data);
}

function applyDataToHTML(data) {
    const logoEl = document.getElementById('site-logo');
    
    // PERBAIKAN LOGIC UNDEFINED
    if (logoEl) {
        if (data.logo_type === 'image' && data.logo_content) {
            // Tampilkan Gambar
            logoEl.innerHTML = `<img src="${data.logo_content}" alt="Logo" style="max-height: 45px; width: auto; vertical-align: middle;">`;
        } else if (data.logo_content) {
            // Tampilkan Teks
            logoEl.innerText = data.logo_content;
        } else {
            // Jika data kosong, jangan tampilkan "undefined", tapi default
            logoEl.innerText = "Fisikaman"; 
        }
    }

    // Set Text Judul & Deskripsi
    const titleEl = document.getElementById('welcome-title');
    const descEl = document.getElementById('welcome-desc');
    
    if(titleEl && data.welcome_title) titleEl.innerText = data.welcome_title;
    if(descEl && data.welcome_desc) descEl.innerText = data.welcome_desc;
}

// --- LOGIKA TOOLS ---
function convertTemp() {
    const input = document.getElementById('temp-input').value;
    const res = document.getElementById('temp-result');
    
    if(input === "") {
        res.innerText = "Masukkan angka!";
        res.style.color = "#f87171";
        return;
    }
    
    const c = parseFloat(input);
    const k = c + 273.15;
    res.innerHTML = `<span style="color:#cbd5e1">${c}°C = </span> <span style="color:#38bdf8; font-size:1.2rem">${k} K</span>`;
}

// --- LOGIKA KUIS (DATA LANGSUNG AGAR TIDAK ERROR) ---
const quizData = [
    { q: "Hukum Newton I disebut juga hukum...", a: ["Kelembaman", "Gravitasi", "Aksi-Reaksi"], c: 0 },
    { q: "Satuan daya listrik adalah...", a: ["Joule", "Volt", "Watt"], c: 2 },
    { q: "Rumus E = mc² milik siapa?", a: ["Newton", "Einstein", "Tesla"], c: 1 }
];

function loadQuiz() {
    const wrapper = document.getElementById('quiz-wrapper');
    if(!wrapper) return;

    wrapper.innerHTML = quizData.map((item, index) => `
        <div style="margin-bottom: 2rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:1rem;">
            <p style="font-weight:bold; margin-bottom:0.8rem; font-size:1.1rem;">${index + 1}. ${item.q}</p>
            ${item.a.map((opt, i) => `
                <button class="quiz-btn" onclick="checkAns(this, ${item.c}, ${i})">${opt}</button>
            `).join('')}
            <div class="feedback" style="margin-top:0.5rem; font-weight:bold; min-height:20px;"></div>
        </div>
    `).join('');
}

window.checkAns = function(btn, correctIdx, myIdx) {
    const parent = btn.parentElement;
    const feedback = parent.querySelector('.feedback');
    const buttons = parent.querySelectorAll('.quiz-btn');

    buttons.forEach(b => b.disabled = true); // Kunci tombol setelah diklik

    if (myIdx === correctIdx) {
        btn.style.background = "#22c55e"; // Hijau
        btn.style.color = "black";
        feedback.innerText = "✅ Benar! Hebat.";
        feedback.style.color = "#4ade80";
    } else {
        btn.style.background = "#ef4444"; // Merah
        buttons[correctIdx].style.background = "#22c55e"; // Tunjukkan yang benar
        buttons[correctIdx].style.color = "black";
        feedback.innerText = "❌ Kurang tepat.";
        feedback.style.color = "#f87171";
    }
};