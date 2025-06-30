// Carica i testi dal file JSON specifico per la pagina
let translations = {};

function getLangJsonFile() {
  // Ottieni il nome della pagina corrente (es: index.html -> lang-index.json)
  const page = location.pathname.split('/').pop().split('.')[0] || 'index';
  return `assets/lang/lang-${page}.json`;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
}

function loadTranslations(callback) {
  fetch(getLangJsonFile())
    .then(res => res.json())
    .then(json => {
      translations = json;
      callback();
    })
    .catch(() => {
      // fallback: nessuna traduzione caricata
      translations = {};
      callback();
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('lang') || 'en';
  loadTranslations(() => setLanguage(savedLang));
});
