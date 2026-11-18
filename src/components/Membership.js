import { t } from '../utils/i18n.js';

// Das Angebot des Netzwerks — ersetzt die frühere Preis-Sektion. Kein App-,
// Abo- oder Credit-Verkauf mehr: Die Teilnahme ist kostenlos, über die
// Aufnahme entscheidet die Kuratierung. Darauf aufbauend die Künstleragentur
// als hochwertige, individuelle Betreuung (digitales + reales Netzwerk um
// Worpswede, begrenzter Kreis — Qualität statt Masse).
export function Membership() {
  const items = (key) => t(`membership.${key}.items`).map((i) => `<li>${i}</li>`).join('');
  return `
    <section class="section membership pricing" id="membership">
      <div class="container text-center">
        <h2 class="section-title">${t('membership.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('membership.lead')}</p>

        <div class="membership-plans">
          <div class="card pricing-card">
            <span class="pricing-badge pricing-badge-muted">${t('membership.free.badge')}</span>
            <h3>${t('membership.free.title')}</h3>
            <div class="pricing-price">${t('membership.free.price')}</div>
            <ul class="pricing-list">${items('free')}</ul>
            <p class="pricing-note">${t('membership.free.note')}</p>
          </div>
          <div class="card pricing-card pricing-featured">
            <span class="pricing-badge">${t('membership.agency.badge')}</span>
            <h3>${t('membership.agency.title')}</h3>
            <div class="pricing-price membership-price-individual">${t('membership.agency.price')}</div>
            <ul class="pricing-list">${items('agency')}</ul>
            <p class="pricing-note">${t('membership.agency.note')}</p>
          </div>
        </div>

        <p class="membership-principle">${t('membership.principle')}</p>
      </div>
    </section>
  `;
}
