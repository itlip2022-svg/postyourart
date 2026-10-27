// Build-Prerendering: schreibt den kompletten Seiteninhalt (englische
// Standard-Version = x-default) statisch in dist/index.html.
//
// Warum: Die Seite ist eine JS-App — Google führt JS aus, aber viele
// KI-Crawler (GPTBot, ClaudeBot, PerplexityBot …) tun das nicht und sahen
// bisher nur den <noscript>-Block. Mit dem statischen HTML lesen sie den
// vollen Inhalt. Der Browser rendert beim Laden wie bisher per JS neu
// (gleiche Komponenten, gleiche Sprache-Erkennung); bis dahin ist der
// Inhalt sichtbar und über das verlinkte CSS gestylt. Bonus: Schlägt das
// JS-Laden fehl, bleibt die Seite trotzdem lesbar statt weiß.
//
// Läuft ohne Browser: Die Render-Funktionen der Komponenten sind pure
// Template-Funktionen. Nur die i18n-Spracherkennung berührt beim Import
// window/localStorage/navigator — dafür reichen Minimal-Shims (Englisch).

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

globalThis.window = {
    location: { search: '', href: 'https://www.postyour.art/' },
    addEventListener: () => {},
    dispatchEvent: () => {},
};
globalThis.localStorage = { getItem: () => null, setItem: () => {} };
// Node ≥21 bringt einen eigenen navigator-Getter mit — daher defineProperty.
Object.defineProperty(globalThis, 'navigator', {
    value: { language: 'en' },
    configurable: true,
});
globalThis.document = { documentElement: { lang: 'en' } };

const { Header } = await import('../src/components/Header.js');
const { Hero } = await import('../src/components/Hero.js');
const { WhyNow } = await import('../src/components/WhyNow.js');
const { FindYourArt } = await import('../src/components/FindYourArt.js');
const { SemanticSpace } = await import('../src/components/SemanticSpace.js');
const { SecondBrain } = await import('../src/components/SecondBrain.js');
const { MatchingSystem } = await import('../src/components/MatchingSystem.js');
const { CollectorBenefits } = await import('../src/components/CollectorBenefits.js');
const { CTA } = await import('../src/components/CTA.js');
const { Footer } = await import('../src/components/Footer.js');
const { ValueProps } = await import('../src/components/ValueProps.js');
const { HowItWorks } = await import('../src/components/HowItWorks.js');
const { VaultTour } = await import('../src/components/VaultTour.js');
const { Ownership } = await import('../src/components/Ownership.js');
const { Pricing } = await import('../src/components/Pricing.js');
const { Faq } = await import('../src/components/Faq.js');
const { BetaSignup } = await import('../src/components/BetaSignup.js');
const { jsonLd, urlForLang } = await import('../src/utils/seo.js');
const { languages } = await import('../src/utils/translations.js');

// Identische Struktur wie render() in src/main.js (Startseiten-Ansicht).
const appHtml = `
      ${Header()}
      <main>
        ${Hero()}
        ${WhyNow()}
        ${FindYourArt()}
        ${CollectorBenefits()}
        ${ValueProps()}
        ${SemanticSpace()}
        ${SecondBrain()}
        ${MatchingSystem()}
        ${HowItWorks()}
        ${BetaSignup()}
        ${VaultTour()}
        ${Ownership()}
        ${Pricing()}
        ${Faq()}
        ${CTA()}
      </main>
      ${Footer()}
    `;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = resolve(root, 'dist/index.html');
let html = readFileSync(indexPath, 'utf-8');

const marker = '<div id="app"></div>';
if (!html.includes(marker)) {
    throw new Error('prerender: <div id="app"></div> nicht in dist/index.html gefunden');
}
html = html.replace(marker, `<div id="app">${appHtml}</div>`);

// Statisches JSON-LD (identisch zu dem, das applySeo() zur Laufzeit setzt)
// und hreflang-Alternates in den <head>, damit Crawler ohne JS sie sehen.
const headExtras = [
    ...languages.map((l) => `  <link rel="alternate" hreflang="${l.code}" href="${urlForLang(l.code)}" />`),
    '  <link rel="alternate" hreflang="x-default" href="https://www.postyour.art/" />',
    `  <script type="application/ld+json" id="seo-jsonld">${JSON.stringify(jsonLd('en'))}</script>`,
].join('\n');
html = html.replace('</head>', `${headExtras}\n</head>`);

writeFileSync(indexPath, html);
const kb = Math.round(Buffer.byteLength(html, 'utf-8') / 1024);
console.log(`prerender: dist/index.html mit statischem Inhalt geschrieben (${kb} kB)`);
