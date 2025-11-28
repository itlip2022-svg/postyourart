import { t } from '../utils/i18n.js';

export function WhyAI() {
  return `
    <section class="section why-ai">
      <div class="container">
        <div class="grid-2">
          <div class="content-col">
            <h2 class="section-title">${t('whyAI.title')}</h2>
            <p class="lead">${t('whyAI.lead')}</p>
            <ul class="feature-list">
              <li>
                ${t('whyAI.list.l1')}
              </li>
              <li>
                ${t('whyAI.list.l2')}
              </li>
              <li>
                ${t('whyAI.list.l3')}
              </li>
            </ul>
          </div>
          <div class="visual-col">
             <div class="ai-visual">
               <img src="/assets/ai_analysis.png" alt="AI Analysis" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
             </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
