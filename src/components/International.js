import { t } from '../utils/i18n.js';

export function International() {
  return `
    <section class="section international text-center">
      <div class="container">
        <h2 class="section-title">${t('international.title')}</h2>
        <p class="lead">${t('international.lead')}</p>
        <div class="grid-3 mt-lg">
          <div class="card">
            <h3>${t('international.cards.c1.title')}</h3>
            <p>${t('international.cards.c1.text')}</p>
          </div>
          <div class="card">
            <h3>${t('international.cards.c2.title')}</h3>
            <p>${t('international.cards.c2.text')}</p>
          </div>
          <div class="card">
            <h3>${t('international.cards.c3.title')}</h3>
            <p>${t('international.cards.c3.text')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
