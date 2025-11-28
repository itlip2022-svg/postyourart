import { t } from '../utils/i18n.js';

export function ArtistTools() {
  return `
    <section class="section artist-tools" id="artists">
      <div class="container">
        <div class="section-header text-center">
          <h2>${t('artistTools.title')}</h2>
          <p class="lead">${t('artistTools.lead')}</p>
        </div>
        <div class="grid-3">
          <div class="card tool-card">
            <h3>${t('artistTools.cards.c1.title')}</h3>
            <p>${t('artistTools.cards.c1.text')}</p>
          </div>
          <div class="card tool-card">
            <h3>${t('artistTools.cards.c2.title')}</h3>
            <p>${t('artistTools.cards.c2.text')}</p>
          </div>
          <div class="card tool-card">
            <h3>${t('artistTools.cards.c3.title')}</h3>
            <p>${t('artistTools.cards.c3.text')}</p>
          </div>
        </div>
        <div class="text-center mt-lg">
          <p>${t('artistTools.footer')}</p>
        </div>
      </div>
    </section>
  `;
}
