import { t } from '../utils/i18n.js';

export function ValueProps() {
  return `
    <section class="section value-props" id="value-props">
      <div class="container text-center">
        <h2 class="section-title">${t('valueProps.title')}</h2>
        <p class="lead">${t('valueProps.lead')}</p>

        <div class="grid-3" style="margin-top: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); text-align: left;">
          <div class="card">
            <div class="icon" style="font-size: 2rem; margin-bottom: 0.75rem;">${t('valueProps.cards.c1.icon')}</div>
            <h3>${t('valueProps.cards.c1.title')}</h3>
            <p>${t('valueProps.cards.c1.text')}</p>
          </div>
          <div class="card">
            <div class="icon" style="font-size: 2rem; margin-bottom: 0.75rem;">${t('valueProps.cards.c2.icon')}</div>
            <h3>${t('valueProps.cards.c2.title')}</h3>
            <p>${t('valueProps.cards.c2.text')}</p>
          </div>
          <div class="card">
            <div class="icon" style="font-size: 2rem; margin-bottom: 0.75rem;">${t('valueProps.cards.c3.icon')}</div>
            <h3>${t('valueProps.cards.c3.title')}</h3>
            <p>${t('valueProps.cards.c3.text')}</p>
          </div>
        </div>

        <div class="text-center mt-lg">
          <h3 class="highlight-text">${t('valueProps.highlight')}</h3>
        </div>
      </div>
    </section>
  `;
}
