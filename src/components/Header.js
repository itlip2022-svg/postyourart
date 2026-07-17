import { setLanguage, getLanguage, t } from '../utils/i18n.js';

export function Header() {
  const currentLang = getLanguage();

  // Expose setLanguage to global scope for onclick handlers
  window.setLanguage = setLanguage;

  const links = `
    <a href="#apps">${t('nav.apps')}</a>
    <a href="#how-it-works">${t('nav.howItWorks')}</a>
    <a href="#target-groups">${t('nav.targetGroups')}</a>
    <a href="#ai-capture">${t('coreFeature.title')}</a>
    <a href="#channels">${t('nav.channels')}</a>
    <a href="https://findyour.art/" target="_blank" rel="noopener">${t('nav.findYourArt')}</a>
  `;

  return `
    <header class="site-header">
      <div class="header-content">
        <a href="#" class="logo">postyour<span class="logo-art">.art</span></a>
        <nav class="site-nav" aria-label="Hauptnavigation">${links}</nav>
        <div class="header-actions">
          <div class="lang-switch">
            <button onclick="setLanguage('en')" class="${currentLang === 'en' ? 'active' : ''}" aria-label="English">EN</button>
            <span>|</span>
            <button onclick="setLanguage('de')" class="${currentLang === 'de' ? 'active' : ''}" aria-label="Deutsch">DE</button>
          </div>
          <a href="https://postyourart.vercel.app/" target="_blank" rel="noopener" class="header-cta">${t('nav.earlyAccess')}</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menü" aria-expanded="false" aria-controls="mobile-nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile Navigation">
      ${links}
      <a href="https://postyourart.vercel.app/" target="_blank" rel="noopener"><strong>${t('nav.earlyAccess')}</strong></a>
    </nav>
  `;
}

export function initHeader() {
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Menü nach Link-Klick schließen (Anker-Sprünge rendern nicht neu)
  mobileNav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
