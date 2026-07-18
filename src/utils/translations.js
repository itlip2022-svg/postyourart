// Alle Sprachen der Website — eine Datei pro Sprache unter ./locales/.
import { en } from './locales/en.js';
import { de } from './locales/de.js';
import { fr } from './locales/fr.js';
import { es } from './locales/es.js';
import { it } from './locales/it.js';
import { pt } from './locales/pt.js';
import { ru } from './locales/ru.js';

export const translations = { en, de, fr, es, it, pt, ru };

// Reihenfolge = Anzeige im Sprachmenü; label = Eigenbezeichnung der Sprache.
export const languages = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
];
