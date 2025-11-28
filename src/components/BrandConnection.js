import { t } from '../utils/i18n.js';

export function BrandConnection() {
  return `
    <section class="section brand-connection">
      <div class="container text-center">
        <div class="brand-box">
          <p class="brand-text">
            ${t('brand.text')}
          </p>
        </div>
      </div>
    </section>
  `;
}
