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
            <h4>${t('footer.platform')}</h4>
            <a href="#mission">${t('nav.mission')}</a>
            <a href="#technology">${t('nav.technology')}</a>
            <a href="#artists">${t('nav.artists')}</a>
            <a href="#collectors">${t('nav.collectors')}</a>
          </div>
          <div class="footer-links">
            <h4>${t('footer.network')}</h4>
            <a href="https://lippeck.art" target="_blank">lippeck.art</a>
            <a href="https://www.artclub.community" target="_blank">artclub.community</a>
          </div>
          <div class="footer-links">
            <h4>${t('footer.legal')}</h4>
            <a href="#imprint">${t('footer.imprint')}</a>
            <a href="#privacy">${t('footer.privacy')}</a>
            <a href="#terms">${t('footer.terms')}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ${t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  `;
}
