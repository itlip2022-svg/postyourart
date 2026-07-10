import { t } from '../utils/i18n.js';

// Besitz-Sektion: die Vault gehört dem Nutzer — mit der echten
// „Meine Daten“-Ansicht (Export & endgültige Löschung) als Beleg.
export function Ownership() {
  return `
    <section class="section ownership" id="ownership">
      <div class="container">
        <div class="grid-2 reverse-mobile" style="align-items: center; gap: 3rem;">
          <div class="visual-col" style="display: flex; justify-content: center;">
            <div class="phone-frame phone-sm">
              <img src="/screens/data-export.webp" alt="Die Seite ‚Meine Daten‘: Versprechen, Komplett-Export und endgültige Kontolöschung" loading="lazy" style="opacity: 1; position: static;">
            </div>
          </div>
          <div class="content-col">
            <h2 class="section-title">${t('ownership.title')}</h2>
            <p class="lead" style="margin-bottom: 2rem;">${t('ownership.lead')}</p>
            <ul class="feature-list">
              <li>${t('ownership.points.p1')}</li>
              <li>${t('ownership.points.p2')}</li>
              <li>${t('ownership.points.p3')}</li>
              <li>${t('ownership.points.p4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
