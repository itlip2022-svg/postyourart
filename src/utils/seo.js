import { t, getLanguage } from './i18n.js';
import { languages } from './translations.js';

// SEO/KI-Optimierung pro Sprache: Titel, Description, Open Graph,
// Canonical + hreflang-Alternates und strukturierte Daten (JSON-LD).
// Die Sprachversionen sind über ?lang=xx eigenständig erreichbar und
// damit für Suchmaschinen und KI-Crawler indexierbar.

const BASE_URL = 'https://www.postyour.art/';

const OG_LOCALES = {
    en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_ES',
    it: 'it_IT', pt: 'pt_PT', ru: 'ru_RU',
};

// Englisch ist die Standard-Version ohne Parameter (und x-default).
export function urlForLang(code) {
    return code === 'en' ? BASE_URL : `${BASE_URL}?lang=${code}`;
}

function upsertMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function upsertLink(rel, href, hreflang) {
    const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

// Strukturierte Daten: Organisation + Web-App mit den Preisplänen.
function jsonLd(lang) {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://www.mas.art/#org',
                name: 'mas.art · Lippeck GmbH',
                url: 'https://www.mas.art',
                email: 'hello@mas.art',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Im Schluh 71',
                    postalCode: '27726',
                    addressLocality: 'Worpswede',
                    addressCountry: 'DE',
                },
            },
            {
                '@type': 'WebApplication',
                '@id': `${BASE_URL}#app`,
                name: 'postyour.art',
                url: urlForLang(lang),
                description: t('meta.description'),
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web, Telegram',
                inLanguage: languages.map((l) => l.code),
                provider: { '@id': 'https://www.mas.art/#org' },
                offers: [
                    { '@type': 'Offer', name: t('pricing.plans.community.title'), price: '0', priceCurrency: 'EUR' },
                    { '@type': 'Offer', name: t('pricing.plans.standard.title'), price: '9.90', priceCurrency: 'EUR' },
                    { '@type': 'Offer', name: t('pricing.plans.premium.title'), price: '29.00', priceCurrency: 'EUR' },
                ],
            },
        ],
    };
}

export function applySeo() {
    const lang = getLanguage();

    document.documentElement.lang = lang;
    document.title = t('meta.title');
    upsertMeta('name', 'description', t('meta.description'));

    // Open Graph & Twitter
    upsertMeta('property', 'og:title', t('meta.title'));
    upsertMeta('property', 'og:description', t('meta.description'));
    upsertMeta('property', 'og:url', urlForLang(lang));
    upsertMeta('property', 'og:locale', OG_LOCALES[lang] || 'en_US');
    languages
        .filter((l) => l.code !== lang)
        .forEach((l, i) => {
            // og:locale:alternate darf mehrfach vorkommen — einmalig anlegen
            const existing = document.head.querySelectorAll('meta[property="og:locale:alternate"]');
            if (existing[i]) existing[i].setAttribute('content', OG_LOCALES[l.code]);
            else {
                const el = document.createElement('meta');
                el.setAttribute('property', 'og:locale:alternate');
                el.setAttribute('content', OG_LOCALES[l.code]);
                document.head.appendChild(el);
            }
        });
    upsertMeta('name', 'twitter:title', t('meta.title'));
    upsertMeta('name', 'twitter:description', t('meta.description'));

    // Canonical + hreflang-Alternates (x-default = automatische Erkennung)
    upsertLink('canonical', urlForLang(lang));
    languages.forEach((l) => upsertLink('alternate', urlForLang(l.code), l.code));
    upsertLink('alternate', BASE_URL, 'x-default');

    // JSON-LD einsetzen bzw. aktualisieren
    let script = document.getElementById('seo-jsonld');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'seo-jsonld';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd(lang));
}
