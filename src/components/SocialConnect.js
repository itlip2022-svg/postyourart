import { t } from '../utils/i18n.js';

// 1-Klick-Kontenanbindung: Über die zentrale postyour.art-API verbindet
// jeder Künstler seine Social-Media-Konten (Instagram, YouTube, Pinterest …)
// mit einem Klick und postet direkt aus der App — ohne API-Einrichtung,
// Download oder Bearbeitung außerhalb der App. Folgt direkt auf die
// Channels-Sektion und vertieft deren Social-Media-Knoten.
export function SocialConnect() {
  const points = t('socialConnect.points').map((p) => `<li>${p}</li>`).join('');
  return `
    <section class="section social-connect" id="social-connect">
      <div class="container text-center">
        <h2 class="section-title">${t('socialConnect.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('socialConnect.lead')}</p>

        <div class="card tour-live social-connect-card">
          <div class="phone-frame">
            <img src="/screens/social-instagram.webp" alt="Instagram-Channel in der App: Konto verbunden über die zentrale API, Feed-Post, Reel und Werkserie direkt senden" loading="lazy">
          </div>
          <div class="tour-live-info">
            <span class="tour-live-badge">${t('socialConnect.badge')}</span>
            <ul class="pricing-list">${points}</ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
