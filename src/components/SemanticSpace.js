import { t } from '../utils/i18n.js';

export function SemanticSpace() {
  return `
    <section class="section semantic-space" id="ai-capture">
      <div class="container">
        <div class="grid-2">
          <div class="content-col">
            <h2 class="section-title">${t('coreFeature.title')}</h2>
            <p class="lead">${t('coreFeature.lead')}</p>
            <ul class="feature-list">
              <li>
                ${t('coreFeature.list.l1')}
              </li>
              <li>
                ${t('coreFeature.list.l2')}
              </li>
              <li>
                ${t('coreFeature.list.l3')}
              </li>
            </ul>
          </div>
          <div class="visual-col">
             <div class="graph-visual" id="semantic-network-animation" style="position: relative; overflow: hidden; width: 100%; height: 100%; min-height: 400px; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.15); background: radial-gradient(circle at center, rgba(255,170,0,0.05), transparent 70%);">
             </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
