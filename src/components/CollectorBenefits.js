import { t } from '../utils/i18n.js';

export function CollectorBenefits() {
  return `
    <section class="section collector-benefits" id="collectors">
      <div class="container">
        <div class="grid-2 reverse-mobile">
          <div class="visual-col">
             <div class="discovery-visual">
               <img src="/assets/discovery_engine.png" alt="Discovery Engine UI" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
             </div>
          </div>
          <div class="content-col">
            <h2 class="section-title">${t('collectorBenefits.title')}</h2>
            <ul class="feature-list">
              <li>
                ${t('collectorBenefits.list.l1')}
              </li>
              <li>
                ${t('collectorBenefits.list.l2')}
              </li>
              <li>
                ${t('collectorBenefits.list.l3')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
