import { t } from '../utils/i18n.js';

export function WhyNow() {
  return `
    <section class="section why-now" id="apps">
      <div class="container">
        <div class="section-header text-center">
          <h2>${t('appsEcosystem.title')}</h2>
          <p class="lead">${t('appsEcosystem.lead')}</p>
        </div>
        <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));">
          <div class="card">
            <h3>${t('appsEcosystem.cards.c1.title')}</h3>
            <p>${t('appsEcosystem.cards.c1.text')}</p>
          </div>
          <div class="card" style="display: flex; flex-direction: column;">
            <h3>${t('appsEcosystem.cards.c2.title')}</h3>
            <p>${t('appsEcosystem.cards.c2.text')}</p>
            <a href="https://findyour.art/" target="_blank" class="btn btn-primary mt-sm" style="margin-top: auto; align-self: flex-start;">${t('appsEcosystem.cards.c2.btn')}</a>
          </div>
        </div>
        <div class="text-center mt-lg">
          <h3 class="highlight-text">${t('appsEcosystem.highlight')}</h3>
        </div>
      </div>
    </section>
  `;
}
