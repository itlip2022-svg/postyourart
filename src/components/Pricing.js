import { t } from '../utils/i18n.js';

// Kostenlos-Sektion: die Vault kostet nichts — bezahlt wird später
// nur für optionale Channels.
export function Pricing() {
  const items = (key, n) =>
    Array.from({ length: n }, (_, i) => `<li>${t(`pricing.${key}.items`)[i]}</li>`).join('');
  return `
    <section class="section pricing" id="pricing">
      <div class="container text-center">
        <h2 class="section-title">${t('pricing.title')}</h2>
        <p class="lead" style="max-width: 720px; margin-left: auto; margin-right: auto;">${t('pricing.lead')}</p>
        <div class="grid-3" style="margin-top: 2.5rem; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 2rem; max-width: 860px; margin-left: auto; margin-right: auto; text-align: left;">
          <div class="card pricing-card pricing-free">
            <span class="pricing-badge">${t('pricing.free.badge')}</span>
            <h3>${t('pricing.free.title')}</h3>
            <div class="pricing-price">0&nbsp;€</div>
            <ul class="pricing-list">${items('free', 5)}</ul>
          </div>
          <div class="card pricing-card">
            <span class="pricing-badge pricing-badge-muted">${t('pricing.paid.badge')}</span>
            <h3>${t('pricing.paid.title')}</h3>
            <div class="pricing-price" style="color: #a0a0a0;">—</div>
            <ul class="pricing-list">${items('paid', 4)}</ul>
            <p style="font-size: 0.9rem; color: #a0a0a0; margin-top: 1rem;">${t('pricing.paid.note')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
