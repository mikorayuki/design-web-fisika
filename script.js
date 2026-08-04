document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    loadQuiz();
});

const fallbackData = {
    logo_type: "image",
    logo_content: "logo.webp",
    welcome_title: "Fisika Tanpa Batas",
    welcome_desc: "Eksplorasi materi fisika dengan antarmuka Liquid Glass yang modern."
};

async function loadConfig() {
    let data = fallbackData;

    try {
        const response = await fetch('settings.json');
        if (response.ok) {
            data = await response.json();
        }
    } catch (err) {
        data = fallbackData;
    }

    applyDataToHTML(data);
}

function applyDataToHTML(data) {
    const logoEl = document.getElementById('site-logo');

    if (logoEl) {
        if (data.logo_type === 'image' && data.logo_content) {
            logoEl.innerHTML = `<img src="${data.logo_content}" alt="Logo" style="max-height: 45px; width: auto; vertical-align: middle;">`;
        } else if (data.logo_content) {
            logoEl.innerText = data.logo_content;
        } else {
            logoEl.innerText = "Fisikaman";
        }
    }

    const titleEl = document.getElementById('welcome-title');
    const descEl = document.getElementById('welcome-desc');

    if (titleEl && data.welcome_title) titleEl.innerText = data.welcome_title;
    if (descEl && data.welcome_desc) descEl.innerText = data.welcome_desc;
}

function convertTemp() {
    const input = document.getElementById('temp-input').value;
    const res = document.getElementById('temp-result');

    if (input === "") {
        res.innerText = "Masukkan angka!";
        res.style.color = "#f87171";
        return;
    }

    const c = parseFloat(input);
    const k = c + 273.15;
    res.innerHTML = `<span style="color:#cbd5e1">${c}°C = </span> <span style="color:#38bdf8; font-size:1.2rem">${k} K</span>`;
}

const quizData = [
    { q: "Hukum Newton I disebut juga hukum...", a: ["Kelembaman", "Gravitasi", "Aksi-Reaksi"], c: 0 },
    { q: "Satuan daya listrik adalah...", a: ["Joule", "Volt", "Watt"], c: 2 },
    { q: "Rumus E = mc² milik siapa?", a: ["Newton", "Einstein", "Tesla"], c: 1 }
];

function loadQuiz() {
    const wrapper = document.getElementById('quiz-wrapper');
    if (!wrapper) return;

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

    buttons.forEach(b => b.disabled = true);

    if (myIdx === correctIdx) {
        btn.style.background = "#22c55e";
        btn.style.color = "black";
        feedback.innerText = "✅ Benar!";
        feedback.style.color = "#4ade80";
    } else {
        btn.style.background = "#ef4444";
        buttons[correctIdx].style.background = "#22c55e";
        buttons[correctIdx].style.color = "black";
        feedback.innerText = "❌ Kurang tepat.";
        feedback.style.color = "#f87171";
    }
};