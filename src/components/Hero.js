import { t } from '../utils/i18n.js';

export function Hero() {
  return `
    <section class="hero section" style="position: relative; overflow: hidden;">
      <div id="hero-network-animation" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;"></div>
      <div class="container hero-content" style="position: relative; z-index: 1;">
        <div class="hero-text">
          <h1 class="hero-title">${t('hero.title')}</h1>
          <p class="hero-subtitle">${t('hero.subtitle')}</p>
          <div class="hero-actions">
            <a href="#email" class="btn btn-primary btn-lg">${t('hero.cta')}</a>
          </div>
        </div>
        <div class="hero-visual">
          <!-- Preserving empty visual column to maintain original grid/flex layout -->
        </div>
      </div>
    </section>
  `;
}
