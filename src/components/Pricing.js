import { t } from '../utils/i18n.js';

// Preis-Sektion: vier Pläne (Community, Standard, Premium, Profi-Betreuung)
// mit Umschalter für monatliche/jährliche Abrechnung. Auf dem Desktop eine
// Reihe, mobil ein wischbares Karussell (Scroll-Snap, reines CSS).
export function Pricing() {
  const items = (key) => t(`pricing.plans.${key}.items`).map((i) => `<li>${i}</li>`).join('');

  // Preis mit beiden Abrechnungsvarianten — sichtbar ist je nach
  // Umschalter-Zustand nur eine (CSS über .billing-yearly am <section>).
  const price = (key) => `
    <div class="pricing-price">
      <span class="price-monthly">${t(`pricing.plans.${key}.monthly`)}</span><span class="price-yearly">${t(`pricing.plans.${key}.yearly`)}</span><span class="pricing-period">&nbsp;/&nbsp;${t('pricing.billing.perMonth')}</span>
    </div>
  `;

  return `
    <section class="section pricing" id="pricing">
      <div class="container text-center">
        <h2 class="section-title">${t('pricing.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('pricing.lead')}</p>

        <div class="billing-toggle" role="group" aria-label="${t('pricing.billing.label')}">
          <button type="button" class="active" data-billing="monthly" aria-pressed="true">${t('pricing.billing.monthly')}</button>
          <button type="button" data-billing="yearly" aria-pressed="false">${t('pricing.billing.yearly')} <span class="billing-save">${t('pricing.billing.save')}</span></button>
        </div>
        <p class="billing-note">
          <span class="price-monthly">${t('pricing.billing.monthlyNote')}</span><span class="price-yearly">${t('pricing.billing.yearlyNote')}</span>
        </p>

        <div class="pricing-plans">
          <div class="card pricing-card">
            <span class="pricing-badge">${t('pricing.plans.community.badge')}</span>
            <h3>${t('pricing.plans.community.title')}</h3>
            <div class="pricing-price">${t('pricing.plans.community.price')}</div>
            <ul class="pricing-list">${items('community')}</ul>
          </div>
          <div class="card pricing-card">
            <span class="pricing-badge pricing-badge-muted">${t('pricing.plans.standard.badge')}</span>
            <h3>${t('pricing.plans.standard.title')}</h3>
            ${price('standard')}
            <ul class="pricing-list">${items('standard')}</ul>
          </div>
          <div class="card pricing-card pricing-featured">
            <span class="pricing-badge">${t('pricing.plans.premium.badge')}</span>
            <h3>${t('pricing.plans.premium.title')}</h3>
            ${price('premium')}
            <ul class="pricing-list">${items('premium')}</ul>
          </div>
          <div class="card pricing-card">
            <span class="pricing-badge pricing-badge-muted">${t('pricing.plans.pro.badge')}</span>
            <h3>${t('pricing.plans.pro.title')}</h3>
            <div class="pricing-price pricing-price-individual">${t('pricing.plans.pro.price')}</div>
            <ul class="pricing-list">${items('pro')}</ul>
            <p class="pricing-note">${t('pricing.plans.pro.note')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Umschalter Monatlich/Jährlich: setzt .billing-yearly am <section>,
// die Preis-Spans werden rein über CSS ein-/ausgeblendet.
export function initPricingToggle() {
  const section = document.getElementById('pricing');
  if (!section) return;
  const buttons = [...section.querySelectorAll('.billing-toggle button')];
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      section.classList.toggle('billing-yearly', btn.dataset.billing === 'yearly');
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });
}
