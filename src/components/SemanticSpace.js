import { t } from '../utils/i18n.js';

export function SemanticSpace() {
  return `
    <section class="section semantic-space" id="technology">
      <div class="container">
        <div class="grid-2">
          <div class="content-col">
            <h2 class="section-title">${t('semanticSpace.title')}</h2>
            <p class="lead">${t('semanticSpace.lead')}</p>
            <ul class="feature-list">
              <li>
                ${t('semanticSpace.list.l1')}
              </li>
              <li>
                ${t('semanticSpace.list.l2')}
              </li>
              <li>
                ${t('semanticSpace.list.l3')}
              </li>
            </ul>
          </div>
          <div class="visual-col">
             <div class="graph-visual">
               <img src="/assets/semantic_graph.png" alt="Semantic Graph" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
             </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
