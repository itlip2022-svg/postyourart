import { setLanguage, getLanguage, t } from '../utils/i18n.js';

export function Header() {
  const currentLang = getLanguage();

  // Expose setLanguage to global scope for onclick handlers
  window.setLanguage = setLanguage;

  return `
    <header style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background-color: rgba(10, 10, 15, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); height: 80px; display: flex; align-items: center; justify-content: center;">
      <div style="max-width: 1200px; width: 100%; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center;">
        
        <a href="#" style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; color: #fff; text-decoration: none; letter-spacing: -0.02em;">postyour.art</a>
        
        <nav style="display: flex; gap: 2rem; align-items: center;" class="desktop-nav">
          <a href="#apps" class="nav-link" style="color: #a0a0a0; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s;">${t('nav.apps')}</a>
          <a href="#target-groups" class="nav-link" style="color: #a0a0a0; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s;">${t('nav.targetGroups')}</a>
          <a href="#ai-capture" class="nav-link" style="color: #a0a0a0; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s;">${t('coreFeature.title')}</a>
          <a href="#channels" class="nav-link" style="color: #a0a0a0; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s;">${t('nav.channels')}</a>
          <a href="https://findyour.art/" target="_blank" class="nav-link" style="color: #a0a0a0; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s;">${t('nav.findYourArt')}</a>
        </nav>

        <div style="display: flex; gap: 1.5rem; align-items: center;">
            <div style="display: flex; gap: 8px;">
                <button onclick="setLanguage('en')" style="background: none; border: none; color: ${currentLang === 'en' ? '#fff' : '#a0a0a0'}; cursor: pointer; font-weight: ${currentLang === 'en' ? 'bold' : 'normal'};">EN</button>
                <span style="color: #a0a0a0">|</span>
                <button onclick="setLanguage('de')" style="background: none; border: none; color: ${currentLang === 'de' ? '#fff' : '#a0a0a0'}; cursor: pointer; font-weight: ${currentLang === 'de' ? 'bold' : 'normal'};">DE</button>
            </div>
            <a href="https://postyourart.vercel.app/" target="_blank" style="background-color: #ffaa00; color: #0a0a0f; padding: 0.6rem 1.5rem; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: background-color 0.2s;">${t('nav.earlyAccess')}</a>
        </div>

      </div>
      <style>
        .nav-link:hover { color: #fff !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      </style>
    </header>
  `;
}
