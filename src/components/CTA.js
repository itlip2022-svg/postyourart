import { t } from '../utils/i18n.js';

export function CTA() {
  return `
    <section class="section cta-section text-center">
      <div class="container">
        <h2 class="section-title">${t('cta.title')}</h2>
        <p class="lead mb-lg">${t('cta.lead')}</p>
        <div class="cta-grid">
          <div class="cta-card">
            <h3>${t('cta.cards.c1.title')}</h3>
            <p>${t('cta.cards.c1.text')}</p>
            <a href="https://postyourart.vercel.app/" target="_blank" class="btn btn-primary">${t('cta.cards.c1.btn')}</a>
          </div>
          <div class="cta-card">
            <h3>${t('cta.cards.c2.title')}</h3>
            <p>${t('cta.cards.c2.text')}</p>
            <a href="https://postyourart.vercel.app/" target="_blank" class="btn btn-primary">${t('cta.cards.c2.btn')}</a>
          </div>
          <div class="cta-card">
            <h3>${t('cta.cards.c3.title')}</h3>
            <p>${t('cta.cards.c3.text')}</p>
            <a href="https://postyourart.vercel.app/" target="_blank" class="btn btn-primary">${t('cta.cards.c3.btn')}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
