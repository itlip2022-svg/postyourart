import { setLanguage, getLanguage, t } from '../utils/i18n.js';

export function Header() {
  const currentLang = getLanguage();

  // Expose setLanguage to global scope for onclick handlers
  window.setLanguage = setLanguage;

  return `
    <header class="header">
      <div class="container header-content">
        <div class="logo">postyour.art</div>
        <nav class="nav">
          <a href="#mission">${t('nav.mission')}</a>
          <a href="#technology">${t('nav.technology')}</a>
          <a href="#artists">${t('nav.artists')}</a>
          <a href="#collectors">${t('nav.collectors')}</a>
        </nav>
        <div style="display: flex; gap: 1rem; align-items: center;">
            <div class="lang-switch">
                <button onclick="setLanguage('en')" style="background: none; border: none; color: ${currentLang === 'en' ? 'var(--color-text)' : 'var(--color-text-muted)'}; cursor: pointer; font-weight: ${currentLang === 'en' ? 'bold' : 'normal'};">EN</button>
                <span style="color: var(--color-text-muted)">|</span>
                <button onclick="setLanguage('de')" style="background: none; border: none; color: ${currentLang === 'de' ? 'var(--color-text)' : 'var(--color-text-muted)'}; cursor: pointer; font-weight: ${currentLang === 'de' ? 'bold' : 'normal'};">DE</button>
            </div>
            <a href="https://login.circle.so/sign_up?request_host=www.artclub.community&user%5Binvitation_token%5D=#email" class="btn btn-primary">${t('nav.earlyAccess')}</a>
        </div>
      </div>
    </header>
  `;
}
