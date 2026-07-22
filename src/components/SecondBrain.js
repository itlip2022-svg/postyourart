import { t } from '../utils/i18n.js';

// Second-Brain-Sektion: die Vault als semantischer Wissensspeicher —
// durchsuchbar, inhaltlich aufbereitet und langfristig die kontextuelle
// Grundlage für neue Ideen und Veröffentlichungen.
export function SecondBrain() {
  const card = (key) => `
    <div class="card">
      <div class="icon" style="font-size: 2rem; margin-bottom: 0.75rem;">${t(`secondBrain.cards.${key}.icon`)}</div>
      <h3>${t(`secondBrain.cards.${key}.title`)}</h3>
      <p>${t(`secondBrain.cards.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section second-brain" id="second-brain">
      <div class="container text-center">
        <h2 class="section-title">${t('secondBrain.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('secondBrain.lead')}</p>
        <div class="grid-3" style="margin-top: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); text-align: left;">
          ${card('c1')}
          ${card('c2')}
          ${card('c3')}
        </div>
      </div>
    </section>
  `;
}
