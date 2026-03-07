import { t } from '../utils/i18n.js';

export function MatchingSystem() {
  return `
    <section class="section matching-system" id="target-groups">
      <div class="container text-center">
        <h2 class="section-title">${t('targetGroups.title')}</h2>
        <p class="lead">${t('targetGroups.lead')}</p>
        
        <div class="matching-grid" style="margin-top: -1rem;">
          <div class="match-card">
            <div class="icon">🎨</div>
            <h3>${t('targetGroups.cards.c1.title')}</h3>
            <p>${t('targetGroups.cards.c1.text')}</p>
          </div>
          <div class="match-card">
            <div class="icon">🏛️</div>
            <h3>${t('targetGroups.cards.c2.title')}</h3>
            <p>${t('targetGroups.cards.c2.text')}</p>
          </div>
          <div class="match-card">
            <div class="icon">🏘️</div>
            <h3>${t('targetGroups.cards.c3.title')}</h3>
            <p>${t('targetGroups.cards.c3.text')}</p>
          </div>
          <div class="match-card">
            <div class="icon">🌟</div>
            <h3>${t('targetGroups.cards.c4.title')}</h3>
            <p>${t('targetGroups.cards.c4.text')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
