import { t } from '../utils/i18n.js';

export function Footer() {
  return `
    <footer class="footer section">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">postyour.art</div>
            <p>${t('footer.brand')}</p>
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
