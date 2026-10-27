import { t } from '../utils/i18n.js';

// Rundgang durch die App: eine hervorgehobene Karte für die Live-Erfassung
// (Kamera + Mikro laufen, Transkription in Echtzeit, automatische Keyframes,
// in drei Stufen zum fertigen Produkt) plus Ansichten mit Erklärungen.
// Die Screenshots stammen aus der aktuellen App (dunkles Design, 2:3),
// daher der App-Rahmen statt des Telefon-Rahmens.
export function VaultTour() {
  const card = (img, alt, key) => `
    <div class="tour-card">
      <div class="app-frame app-frame-sm">
        <img src="${img}" alt="${alt}" loading="lazy">
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
          <div class="app-frame">
            <img src="/screens/vault-live-start.webp" alt="Live-Erfassung, Stufe 1: Aufnahme mit Kamera und Mikrofon starten, Foto-Intervall und Zwischen-Summaries einstellen" loading="lazy">
          </div>
          <div class="tour-live-info">
            <span class="tour-live-badge">${t('vaultTour.live.badge')}</span>
            <h3>${t('vaultTour.live.title')}</h3>
            <p>${t('vaultTour.live.text')}</p>
            <ul class="pricing-list">${livePoints}</ul>
          </div>
        </div>

        <div class="grid-3" style="margin-top: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 2rem;">
          ${card('/screens/vault-gallery.webp', 'Werk-Detail in der Galerie: Technik, Maße, Preis, Motiv, Farbpalette und Stil-Tags', 'c1')}
          ${card('/screens/vault-stories.webp', 'Story-Editor mit Foto aus dem Atelier und Medienleiste', 'c2')}
          ${card('/screens/vault-archive.webp', 'Mein Archiv: Ordner in Alben sortiert, mit KI-Kategorisierung und Suche', 'c3')}
          ${card('/screens/vault-channels.webp', 'Channels-Übersicht: Druck, Web, Sell und Marketing & SEO mit eingereichten Aufträgen', 'c4')}
        </div>
      </div>
    </section>
  `;
}
