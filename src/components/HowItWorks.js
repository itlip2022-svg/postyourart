import { t } from '../utils/i18n.js';

// Ablauf-Sektion: animierte Screenshot-Sequenz (Erfassung eines Werks)
// neben drei nummerierten Schritten. Die Screenshots stammen aus der App.
export function HowItWorks() {
  return `
    <section class="section how-it-works" id="how-it-works">
      <div class="container">
        <div class="section-header text-center">
          <h2>${t('howItWorks.title')}</h2>
          <p class="lead">${t('howItWorks.lead')}</p>
        </div>
        <div class="grid-2" style="align-items: center; gap: 3rem;">
          <div class="visual-col" style="display: flex; justify-content: center;">
            <div class="phone-frame phone-anim">
              <img src="/screens/capture-chat.webp" alt="Erfassung im Chat: Foto und Beschreibung, der Assistent legt das Werk an" loading="lazy">
              <img src="/screens/artwork-detail.webp" alt="Das erfasste Werk mit Titel, Technik, Maßen und Preis" loading="lazy">
              <img src="/screens/telegram-capture.webp" alt="Erfassung per Telegram: Foto mit Beschreibung und Sprachnachricht, der Assistent legt das Werk an" loading="lazy">
              <img src="/screens/gallery.webp" alt="Die Galerie mit allen erfassten Werken" loading="lazy">
            </div>
          </div>
          <div class="content-col">
            <ol class="steps-list">
              <li>
                <span class="step-num">1</span>
                <div><strong>${t('howItWorks.steps.s1.title')}</strong><p>${t('howItWorks.steps.s1.text')}</p></div>
              </li>
              <li>
                <span class="step-num">2</span>
                <div><strong>${t('howItWorks.steps.s2.title')}</strong><p>${t('howItWorks.steps.s2.text')}</p></div>
              </li>
              <li>
                <span class="step-num">3</span>
                <div><strong>${t('howItWorks.steps.s3.title')}</strong><p>${t('howItWorks.steps.s3.text')}</p></div>
              </li>
            </ol>
            <div class="telegram-note" style="margin-top: 2rem; padding: 1.1rem 1.35rem; border: 1px solid rgba(255, 170, 0, 0.35); border-left: 4px solid #ffaa00; border-radius: 12px; background: rgba(255, 170, 0, 0.06); font-size: 0.98rem; line-height: 1.55;">
              <span style="font-size: 1.15rem; margin-right: 0.5rem;">📲</span>${t('howItWorks.note')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
