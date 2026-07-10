import { t } from '../utils/i18n.js';

export function Footer() {
  return `
    <footer class="footer section">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">postyour.art</div>
            <p>${t('footer.brand')}</p>
            <a href="https://www.mas.art" target="_blank" rel="noopener" style="display: inline-flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; margin-top: 1rem; text-decoration: none;">
              <span style="color: #a0a0a0; font-size: 0.85rem;">${t('footer.projectOf')}</span>
              <span style="display: inline-flex; align-items: center; justify-content: center; background: #f4f1ec; border-radius: 14px; padding: 0.6rem 0.9rem;">
                <img src="/assets/masart-logo.png" alt="mas.art" style="height: 84px; width: auto; display: block;">
              </span>
            </a>
          </div>
          <div class="footer-links">
            <h4>${t('footer.network')}</h4>
            <a href="https://www.mas.art" target="_blank">mas.art</a>
            <a href="https://lippeck.art" target="_blank">lippeck.art</a>
          </div>
          <div class="footer-links">
            <h4>${t('footer.legal')}</h4>
            <a href="#imprint">${t('footer.imprint')}</a>
            <a href="#privacy">${t('footer.privacy')}</a>
            <a href="https://mas.art/policies/terms-of-service" target="_blank">${t('footer.terms')}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ${t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  `;
}
