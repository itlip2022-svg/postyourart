import { t } from '../utils/i18n.js';

export function Privacy() {
  return `
    <section class="section privacy-section">
      <div class="container">
        <h2 class="section-title">${t('privacy.title')}</h2>
        <div class="legal-content">
          ${t('privacy.content')}
        </div>
        <div class="mt-lg">
            <a href="#" class="btn btn-outline" onclick="window.location.reload()">Back to Home</a>
        </div>
      </div>
    </section>
  `;
}
