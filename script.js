/* --- CONFIGURATION --- */
const chapters = [
    "The Awakening Void", "Eyes of the Ossuary", "Disciples of Burning Light", 
    "The Empress Sends Word", "The Third Path", "Elara", 
    "What the Void Remembers", "Refusal", "The Faith That Breaks", "Convergence"
];

/* --- DOM ELEMENTS --- */
const mainUI = document.getElementById('main-ui');
const readerUI = document.getElementById('reader-ui');
const listContainer = document.getElementById('chapter-list');
const readerTitle = document.getElementById('reader-title');
const contentBody = document.getElementById('content-body');
const themeBtn = document.getElementById('theme-btn');
const backBtn = document.getElementById('back-btn');

/* --- THEME LOGIC --- */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

/* --- ARCHIVE GENERATOR --- */
function renderArchive() {
    listContainer.innerHTML = '';
    chapters.forEach((title, index) => {
        const num = index + 1;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 style="margin:0; font-family:'Share Tech Mono'; font-size:0.7rem; color:var(--accent)">CHAPTER ${num}</h3>
            <p style="margin:10px 0 0 0; font-weight:600; letter-spacing:1px;">${title}</p>
        `;
        card.onclick = () => openChapter(num, title);
        listContainer.appendChild(card);
    });
}

/* --- READER LOGIC --- */
async function openChapter(num, title) {
    mainUI.style.display = 'none';
    readerUI.style.display = 'block';
    readerTitle.innerText = title;
    contentBody.innerText = "Consulting the Void...";
    window.scrollTo(0,0);

    // Forgiving fetch logic for different naming styles
    const paths = [`Chapter ${num}.txt`, `Chapter ${num} .txt`];
    
    for (let path of paths) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                const text = await res.text();
                contentBody.innerText = text;
                return;
            }
        } catch (e) { console.error("Void Error:", e); }
    }
    contentBody.innerText = "Error: This chapter has vanished from the Repository.";
}

function closeReader() {
    readerUI.style.display = 'none';
    mainUI.style.display = 'block';
    window.scrollTo(0,0);
}

/* --- INITIALIZATION --- */
backBtn.addEventListener('click', closeReader);
initTheme();
renderArchive();
