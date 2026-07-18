import { translations } from './translations.js';

const SUPPORTED = Object.keys(translations);

// Sprachwahl: URL-Parameter (?lang=xx, für indexierbare Sprachversionen)
// > gespeicherte Wahl > Browsersprache > Englisch.
function detectLanguage() {
    const param = new URLSearchParams(window.location.search).get('lang');
    if (param && SUPPORTED.includes(param)) {
        localStorage.setItem('lang', param);
        return param;
    }
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
        // Neuladen mit ?lang=xx in der URL — so ist jede Sprachversion
        // eigenständig verlinkbar und für Suchmaschinen indexierbar.
        const url = new URL(window.location.href);
        if (lang === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', lang);
        window.location.href = url.toString();
        if (url.toString() === window.location.href) location.reload();
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
