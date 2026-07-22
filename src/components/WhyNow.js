import { t } from '../utils/i18n.js';

// "Deine Daten. Dein Wert." — warum die eigene Kunstdokumentation wertvoll
// ist (strukturiert & semantisch an einem Ort), plus die vier
// Daten-Versprechen. Verweist auf die App-Beschreibung (#how-it-works).
export function WhyNow() {
  const promise = (key) => `
    <div class="card promise-card">
      <h3>${t(`appsEcosystem.promises.${key}.title`)}</h3>
      <p>${t(`appsEcosystem.promises.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section why-now" id="apps">
      <div class="container">
        <div class="section-header text-center">
          <h2>${t('appsEcosystem.title')}</h2>
          <p class="lead">${t('appsEcosystem.lead')}</p>
          <p class="data-value-para">${t('appsEcosystem.para')}</p>
        </div>
        <div class="grid-3 promise-grid">
          <div class="card promise-card">
            <div id="data-sculpture" class="tile-3d" aria-hidden="true"></div>
            <h3>${t('appsEcosystem.promises.c5.title')}</h3>
            <p>${t('appsEcosystem.promises.c5.text')}</p>
          </div>
          ${promise('c1')}
          ${promise('c2')}
        </div>
        <div class="text-center mt-lg">
          <h3 class="highlight-text">${t('appsEcosystem.highlight')}</h3>
          <div class="hero-actions mt-sm">
            <a href="#beta" class="btn btn-primary">${t('appsEcosystem.ctaBeta')}</a>
            <a href="#how-it-works" class="btn btn-outline">${t('appsEcosystem.ctaApp')}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
