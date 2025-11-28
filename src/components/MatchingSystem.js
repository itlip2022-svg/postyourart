import { t } from '../utils/i18n.js';

export function MatchingSystem() {
  return `
    <section class="section matching-system">
      <div class="container text-center">
        <h2 class="section-title">${t('matching.title')}</h2>
        <p class="lead">${t('matching.lead')}</p>
        
        <div class="matching-grid mt-lg">
          <div class="match-card">
            <div class="icon">👤</div>
            <h3>${t('matching.cards.c1.title')}</h3>
            <p>${t('matching.cards.c1.text')}</p>
          </div>
          <div class="match-card">
            <div class="icon">❤️</div>
            <h3>${t('matching.cards.c2.title')}</h3>
            <p>${t('matching.cards.c2.text')}</p>
          </div>
          <div class="match-card">
            <div class="icon">🔍</div>
            <h3>${t('matching.cards.c3.title')}</h3>
            <p>${t('matching.cards.c3.text')}</p>
          </div>
          <div class="match-card">
            <div class="icon">✨</div>
            <h3>${t('matching.cards.c4.title')}</h3>
            <p>${t('matching.cards.c4.text')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
