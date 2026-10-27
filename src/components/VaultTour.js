import { t } from '../utils/i18n.js';

// Rundgang durch die App: eine hervorgehobene Karte für die Live-Erfassung
// (Kamera + Mikro laufen, Transkription in Echtzeit, automatische Keyframes,
// am Ende Werkstattbericht/Artikel) plus vier Ansichten mit Erklärungen.
export function VaultTour() {
  const card = (img, alt, key) => `
    <div class="tour-card">
      <div class="phone-frame phone-sm">
        <img src="${img}" alt="${alt}" loading="lazy" style="opacity: 1; position: static;">
      </div>
      <h3>${t(`vaultTour.cards.${key}.title`)}</h3>
      <p>${t(`vaultTour.cards.${key}.text`)}</p>
    </div>
  `;
  const livePoints = t('vaultTour.live.points').map((p) => `<li>${p}</li>`).join('');
  return `
    <section class="section vault-tour" id="vault-tour">
      <div class="container text-center">
        <h2 class="section-title">${t('vaultTour.title')}</h2>
        <p class="lead">${t('vaultTour.lead')}</p>

        <div class="card tour-live">
          <div class="phone-frame phone-sm">
            <img src="/screens/live.webp" alt="Live-Erfassung: aktive Session mit Kamera, Aufnahme-Anzeige und Live-Transkription" loading="lazy" style="opacity: 1; position: static;">
          </div>
          <div class="tour-live-info">
            <span class="tour-live-badge">${t('vaultTour.live.badge')}</span>
            <h3>${t('vaultTour.live.title')}</h3>
            <p>${t('vaultTour.live.text')}</p>
            <ul class="pricing-list">${livePoints}</ul>
          </div>
        </div>

        <div class="grid-3" style="margin-top: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 2rem;">
          ${card('/screens/gallery.webp', 'Galerie-Ansicht der Vault mit Werken, Jahr und Preis', 'c1')}
          ${card('/screens/appointments.webp', 'Terminübersicht mit Vernissage-Eintrag', 'c2')}
          ${card('/screens/stories.webp', 'Story-Ansicht mit Fotos und Videos aus dem Atelier', 'c3')}
          ${card('/screens/channels.webp', 'Channels-Übersicht: Druck, Web, Social und Verkauf direkt aus der Vault', 'c4')}
        </div>
      </div>
    </section>
  `;
}
