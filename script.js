/* --- CONFIGURATION --- */
const chapters = [
    "The Awakening Void", "Eyes of the Ossuary", "Disciples of Burning Light", 
    "The Empress Sends Word", "The Third Path", "Elara", 
    "What the Void Remembers", "Refusal", "The Faith That Breaks", "Convergence"
];

/* --- ELEMENTS --- */
const mainUI = document.getElementById('main-ui');
const readerUI = document.getElementById('reader-ui');
const listContainer = document.getElementById('chapter-list');
const readerTitle = document.getElementById('reader-title');
const contentBody = document.getElementById('content-body');
const themeBtn = document.getElementById('theme-btn');
const backBtn = document.getElementById('back-btn');
const statusText = document.getElementById('reading-status');

/* --- THEME LOGIC --- */
function initTheme() {
    // Check localStorage first, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Update button icon/text based on theme
    themeBtn.innerText = savedTheme === 'dark' ? '☼' : '☾';
}

themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    
    // Switch icon
    themeBtn.innerText = next === 'dark' ? '☼' : '☾';
});

/* --- ARCHIVE BUILDER --- */
function renderArchive() {
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    chapters.forEach((title, index) => {
        const num = index + 1;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 style="margin:0; font-family:'Share Tech Mono'; font-size:0.7rem; color:var(--accent)">CHAPTER ${num}</h3>
            <p style="margin:10px 0 0 0; font-weight:600; font-family:'Cormorant Garamond';">${title}</p>
        `;
        card.onclick = () => openChapter(num, title);
        listContainer.appendChild(card);
    });
}

/* --- READER ENGINE --- */
async function openChapter(num, title) {
    // Hide Home, Show Reader
    mainUI.style.display = 'none';
    readerUI.style.display = 'block';
    
    // Set UI Details
    readerTitle.innerText = title;
    statusText.innerText = `READING: CHAPTER ${num}`;
    contentBody.innerText = "Consulting the Void...";
    
    // Smooth scroll to top of reader
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch Logic
    const paths = [`Chapter ${num}.txt`, `Chapter ${num} .txt`];
    
    for (let path of paths) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                const text = await res.text();
                contentBody.innerText = text;
                return;
            }
        } catch (e) { console.error("Void Fetch Error:", e); }
    }
    contentBody.innerText = "Error: This chapter has not yet been transcribed to the Repository.";
}

/* --- NAVIGATION --- */
backBtn.addEventListener('click', () => {
    readerUI.style.display = 'none';
    mainUI.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --- INITIALIZE --- */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderArchive();
});
