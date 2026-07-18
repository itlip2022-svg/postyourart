import { setLanguage, getLanguage, t } from '../utils/i18n.js';
import { languages } from '../utils/translations.js';

export function Header() {
  const currentLang = getLanguage();
  const current = languages.find((l) => l.code === currentLang) || languages[0];

  const links = `
    <a href="#apps">${t('nav.apps')}</a>
    <a href="#how-it-works">${t('nav.howItWorks')}</a>
    <a href="#target-groups">${t('nav.targetGroups')}</a>
    <a href="#ai-capture">${t('coreFeature.title')}</a>
    <a href="#channels">${t('nav.channels')}</a>
    <a href="https://findyour.art/" target="_blank" rel="noopener">${t('nav.findYourArt')}</a>
  `;

  // Sprachmenü: Knopf mit aktuellem Kürzel, Aufklappliste mit allen
  // Sprachen in Eigenbezeichnung (initLangMenu).
  const langMenu = `
    <div class="lang-menu" id="lang-menu">
      <button type="button" class="lang-menu-btn" id="lang-menu-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${current.label}">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>
        <span>${current.code.toUpperCase()}</span>
        <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true" fill="currentColor"><path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>
      </button>
      <ul class="lang-menu-list" id="lang-menu-list" role="listbox" aria-label="Language">
        ${languages.map((l) => `
          <li>
            <button type="button" role="option" data-lang="${l.code}" aria-selected="${l.code === currentLang}" class="${l.code === currentLang ? 'active' : ''}">
              <span class="lang-code">${l.code.toUpperCase()}</span> ${l.label}
            </button>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  return `
    <header class="site-header">
      <div class="header-content">
        <a href="#" class="logo">postyour<span class="logo-art">.art</span></a>
        <nav class="site-nav" aria-label="Hauptnavigation">${links}</nav>
        <div class="header-actions">
          ${langMenu}
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

  initLangMenu();
}

// Sprachmenü: auf-/zuklappen, Klick außerhalb oder Escape schließt,
// Sprachwahl lädt die Seite in der neuen Sprache (setLanguage → reload).
function initLangMenu() {
  const menu = document.getElementById('lang-menu');
  const btn = document.getElementById('lang-menu-btn');
  const list = document.getElementById('lang-menu-list');
  if (!menu || !btn || !list) return;

  const close = () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  list.addEventListener('click', (e) => {
    const option = e.target.closest('button[data-lang]');
    if (!option) return;
    close();
    if (option.dataset.lang !== getLanguage()) setLanguage(option.dataset.lang);
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
