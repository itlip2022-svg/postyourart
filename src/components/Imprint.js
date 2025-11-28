import { t } from '../utils/i18n.js';

export function Imprint() {
  return `
    <section class="section imprint-section">
      <div class="container">
        <h2 class="section-title">${t('imprint.title')}</h2>
        <div class="legal-content">
          ${t('imprint.content')}
        </div>
        <div class="mt-lg">
            <a href="#" class="btn btn-outline" onclick="window.location.reload()">Back to Home</a>
        </div>
      </div>
    </section>
  `;
}
