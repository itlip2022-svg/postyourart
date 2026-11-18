import { t } from '../utils/i18n.js';

// Das Herzstück der Neuausrichtung: die Verbindung zur historischen,
// weltberühmten Künstlerkolonie Worpswede — und unsere eigene Reputation
// vor Ort (Räume, Ausstellungen, gewachsene Beziehungen), die dem Angebot
// Namen und Umsetzungskraft gibt. Bewusst emotional statt technisch.
// Nutzt dieselben Karten-/Pivot-Stile wie die Warum-Netzwerk-Sektion.
export function Worpswede() {
  const tile = (key) => `
    <div class="card why-network-card">
      <h3>${t(`worpswede.tiles.${key}.title`)}</h3>
      <p>${t(`worpswede.tiles.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section worpswede" id="worpswede">
      <div class="container text-center">
        <h2 class="section-title">${t('worpswede.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('worpswede.lead')}</p>
        <div class="grid-3" style="margin-top: 2.5rem;">
          ${tile('w1')}
          ${tile('w2')}
          ${tile('w3')}
        </div>
        <p class="why-network-pivot">${t('worpswede.pivot')}</p>
      </div>
    </section>
  `;
}
