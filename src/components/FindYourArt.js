import { t } from '../utils/i18n.js';

// findyour.art — eigene Sektion: Verkaufsportal mit Katalog und
// Künstlerportfolio, direkt aus der Vault gespeist.
export function FindYourArt() {
  const card = (key) => `
    <div class="card">
      <h3>${t(`findyourart.cards.${key}.title`)}</h3>
      <p>${t(`findyourart.cards.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section findyourart" id="findyourart">
      <div class="container text-center">
        <h2 class="section-title">${t('findyourart.title')}</h2>
        <p class="lead">${t('findyourart.lead')}</p>
        <div class="grid-3" style="margin-top: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); text-align: left;">
          ${card('c1')}
          ${card('c2')}
          ${card('c3')}
          ${card('c4')}
        </div>
        <div class="mt-lg">
          <a href="https://findyour.art/" target="_blank" rel="noopener" class="btn btn-primary btn-lg">${t('findyourart.btn')}</a>
        </div>
      </div>
    </section>
  `;
}
