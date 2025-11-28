import { t } from '../utils/i18n.js';

export function WhyNow() {
  return `
    <section class="section why-now" id="mission">
      <div class="container">
        <div class="section-header text-center">
          <h2>${t('whyNow.title')}</h2>
          <p class="lead">${t('whyNow.lead')}</p>
        </div>
        <div class="grid-3">
          <div class="card">
            <h3>${t('whyNow.cards.c1.title')}</h3>
            <p>${t('whyNow.cards.c1.text')}</p>
          </div>
          <div class="card">
            <h3>${t('whyNow.cards.c2.title')}</h3>
            <p>${t('whyNow.cards.c2.text')}</p>
          </div>
          <div class="card">
            <h3>${t('whyNow.cards.c3.title')}</h3>
            <p>${t('whyNow.cards.c3.text')}</p>
          </div>
        </div>
        <div class="text-center mt-lg">
          <h3 class="highlight-text">${t('whyNow.highlight')}</h3>
        </div>
      </div>
    </section>
  `;
}
