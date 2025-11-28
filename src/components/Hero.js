import { t } from '../utils/i18n.js';

export function Hero() {
  return `
    <section class="hero section">
      <div class="container hero-content">
        <div class="hero-text">
          <p class="hero-collab">${t('hero.collab')}</p>
          <h1 class="hero-title">${t('hero.title')}</h1>
          <p class="hero-subtitle">${t('hero.subtitle')}</p>
          <div class="hero-actions">
            <a href="https://login.circle.so/sign_up?request_host=www.artclub.community&user%5Binvitation_token%5D=#email" class="btn btn-primary btn-lg">${t('hero.cta')}</a>
          </div>
        </div>
        <div class="hero-visual">
          <!-- Placeholder for neural network visual -->
          <div id="hero-network-animation" class="neural-network-placeholder"></div>
        </div>
      </div>
    </section>
  `;
}
