import { t } from '../utils/i18n.js';

// Rundgang: vier echte App-Ansichten mit kurzen Erklärungen.
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
  return `
    <section class="section vault-tour" id="vault-tour">
      <div class="container text-center">
        <h2 class="section-title">${t('vaultTour.title')}</h2>
        <p class="lead">${t('vaultTour.lead')}</p>
        <div class="grid-3" style="margin-top: 2.5rem; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 2rem;">
          ${card('/screens/gallery.webp', 'Galerie-Ansicht der Vault mit Werken, Jahr und Preis', 'c1')}
          ${card('/screens/appointments.webp', 'Terminübersicht mit Vernissage-Eintrag', 'c2')}
          ${card('/screens/stories.webp', 'Story-Ansicht mit Fotos und Videos aus dem Atelier', 'c3')}
          ${card('/screens/channels.webp', 'Channels-Übersicht: Druck, Web, Verkauf und Marketing direkt aus der Vault', 'c4')}
        </div>
      </div>
    </section>
  `;
}
