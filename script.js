/* --- CHAPTER DATA --- */
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

/* --- THEME INITIALIZATION --- */
function initTheme() {
    const savedTheme = localStorage.
