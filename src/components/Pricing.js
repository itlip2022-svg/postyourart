import { t } from '../utils/i18n.js';

// Kostenlos-Sektion: Vault und Verkauf auf findyour.art kosten nichts —
// Channels werden rein nach Nutzung abgerechnet, dazu die Profi-Betreuung
// für Berufskünstler.
export function Pricing() {
  const items = (key) => t(`pricing.${key}.items`).map((i) => `<li>${i}</li>`).join('');
  return `
    <section class="section pricing" id="pricing">
      <div class="container text-center">
        <h2 class="section-title">${t('pricing.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('pricing.lead')}</p>
        <div class="grid-3" style="margin-top: 2.5rem; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 2rem; max-width: 1160px; margin-left: auto; margin-right: auto; text-align: left;">
          <div class="card pricing-card pricing-free">
            <span class="pricing-badge">${t('pricing.free.badge')}</span>
            <h3>${t('pricing.free.title')}</h3>
            <div class="pricing-price">0&nbsp;€</div>
            <ul class="pricing-list">${items('free')}</ul>
          </div>
          <div class="card pricing-card">
            <span class="pricing-badge pricing-badge-muted">${t('pricing.paid.badge')}</span>
            <h3>${t('pricing.paid.title')}</h3>
            <div class="pricing-price pricing-price-muted">—</div>
            <ul class="pricing-list">${items('paid')}</ul>
            <p class="pricing-note">${t('pricing.paid.note')}</p>
          </div>
          <div class="card pricing-card">
            <span class="pricing-badge pricing-badge-muted">${t('pricing.pro.badge')}</span>
            <h3>${t('pricing.pro.title')}</h3>
            <div class="pricing-price pricing-price-individual">${t('pricing.pro.price')}</div>
            <ul class="pricing-list">${items('pro')}</ul>
            <p class="pricing-note">${t('pricing.pro.note')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
