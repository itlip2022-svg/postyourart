import { t } from '../utils/i18n.js';

// FAQ-Sektion: die Kernfragen in Frage-Antwort-Form — für Besucher und
// als zitierfähige Quelle für Suchmaschinen und KI-Antwortmaschinen
// (das passende FAQPage-Schema wird in utils/seo.js aus denselben
// Übersetzungen erzeugt, damit sichtbarer Text und Markup übereinstimmen).
const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

export function faqItems() {
  return FAQ_KEYS.map((key) => ({
    q: t(`faq.items.${key}.q`),
    a: t(`faq.items.${key}.a`),
  }));
}

export function Faq() {
  const items = faqItems()
    .map(({ q, a }) => `
      <details class="faq-item">
        <summary>${q}</summary>
        <p>${a}</p>
      </details>
    `)
    .join('');
  return `
    <section class="section faq" id="faq">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">${t('faq.title')}</h2>
          <p class="lead">${t('faq.lead')}</p>
        </div>
        <div class="faq-list">${items}</div>
      </div>
    </section>
  `;
}
