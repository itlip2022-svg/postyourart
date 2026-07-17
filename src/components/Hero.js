import { t } from '../utils/i18n.js';

export function Hero() {
  return `
    <section class="hero">
      <div id="hero-network-animation"></div>
      <div class="container hero-content">
        <p class="hero-collab">${t('hero.collab')}</p>
        <h1 class="hero-title">${t('hero.title')}</h1>
        <p class="hero-subtitle">${t('hero.subtitle')}</p>
        <p class="hero-data-sovereignty">${t('hero.dataSovereignty')}</p>
        <div class="hero-actions">
          <a href="#beta" class="btn btn-primary btn-lg">${t('hero.cta')}</a>
          <a href="#how-it-works" class="btn btn-outline btn-lg">${t('nav.howItWorks')}</a>
        </div>
      </div>
    </section>
  `;
}
