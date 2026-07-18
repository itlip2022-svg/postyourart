import { translations } from './translations.js';

const SUPPORTED = Object.keys(translations);

// Sprachwahl: gespeicherte Wahl > Browsersprache > Englisch.
function detectLanguage() {
    const stored = localStorage.getItem('lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'en';
}

let currentLang = detectLanguage();

export function getLanguage() {
    return currentLang;
}

export function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        // Dispatch a custom event so components can listen for changes if needed
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
        // For this simple app, we might just reload the page or re-render
        location.reload();
    }
}

export function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];

    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Fallback to key if not found
        }
    }

    return value;
}
