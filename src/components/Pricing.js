import { t } from '../utils/i18n.js';

// Preis-Sektion, Credit-Modell: Die Vault ist komplett kostenlos und keine
// Daten verlassen den persönlichen Bereich — es gibt kein Abo. Nur
// Auslieferungen in die Channels kosten Credits, gekauft als Pakete;
// größere Pakete senken den Preis pro Credit. Die Paket-Reihe ist auf dem
// Desktop eine Reihe, mobil ein wischbares Karussell (Scroll-Snap, CSS).
export function Pricing() {
  const freeItems = t('pricing.free.items').map((i) => `<li>${i}</li>`).join('');
  const facts = t('pricing.credits.facts').map((f) => `<li>${f}</li>`).join('');

  const pack = (key, { featured = false, save = true } = {}) => `
    <div class="card pricing-card credit-card${featured ? ' pricing-featured' : ''}">
      <span class="pricing-badge${featured ? '' : ' pricing-badge-muted'}">${t(`pricing.credits.packs.${key}.name`)}${featured ? ` · ${t(`pricing.credits.packs.${key}.flag`)}` : ''}</span>
      ${save ? `<span class="credit-save">${t(`pricing.credits.packs.${key}.save`)}</span>` : ''}
      <div class="credit-amount">${t(`pricing.credits.packs.${key}.credits`)}<span class="credit-unit">${t('pricing.credits.unit')}</span></div>
      <div class="pricing-price">${t(`pricing.credits.packs.${key}.price`)}</div>
      <p class="credit-per">${t(`pricing.credits.packs.${key}.per`)}</p>
      <p class="credit-use">${t(`pricing.credits.packs.${key}.use`)}</p>
    </div>
  `;

  return `
    <section class="section pricing" id="pricing">
      <div class="container text-center">
        <h2 class="section-title">${t('pricing.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('pricing.lead')}</p>

        <div class="card pricing-card pricing-featured pricing-free">
          <span class="pricing-badge">${t('pricing.free.badge')}</span>
          <h3>${t('pricing.free.title')}</h3>
          <p class="pricing-free-text">${t('pricing.free.text')}</p>
          <ul class="pricing-list">${freeItems}</ul>
        </div>

        <h3 class="credits-title">${t('pricing.credits.title')}</h3>
        <p class="credits-lead">${t('pricing.credits.lead')}</p>

        <div class="pricing-plans">
          ${pack('p1', { save: false })}
          ${pack('p2', { featured: true })}
          ${pack('p3')}
        </div>

        <ul class="credit-facts">${facts}</ul>
        <p class="pricing-note pricing-pro-note">${t('pricing.pro')}</p>
      </div>
    </section>
  `;
}
