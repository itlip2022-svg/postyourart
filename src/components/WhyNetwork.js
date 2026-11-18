import { t } from '../utils/i18n.js';

// Die Instagram-Realität als Argument fürs Netzwerk: organische Reichweite
// verkauft keine Kunst (Zahlen aus Branchenanalysen und eigener Erfahrung),
// Sichtbarkeit ist dort käuflich — der Gegenentwurf ist Kuratierung.
// Direkt nach dem Hero, als Begründung für alles Folgende.
export function WhyNetwork() {
  const tile = (key) => `
    <div class="card why-network-card">
      <h3>${t(`whyNetwork.tiles.${key}.title`)}</h3>
      <p>${t(`whyNetwork.tiles.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section why-network" id="why-network">
      <div class="container text-center">
        <h2 class="section-title">${t('whyNetwork.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('whyNetwork.lead')}</p>
        <div class="grid-3" style="margin-top: 2.5rem;">
          ${tile('n1')}
          ${tile('n2')}
          ${tile('n3')}
        </div>
        <p class="why-network-pivot">${t('whyNetwork.pivot')}</p>
      </div>
    </section>
  `;
}
