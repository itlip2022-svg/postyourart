import '@fontsource/outfit/400.css';
import '@fontsource/outfit/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import './styles/global.css';
import './styles/components.css';
import { Header, initHeader } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { WhyNow } from './components/WhyNow.js';
import { FindYourArt } from './components/FindYourArt.js';
import { SemanticSpace } from './components/SemanticSpace.js';
import { SecondBrain } from './components/SecondBrain.js';
import { MatchingSystem } from './components/MatchingSystem.js';
import { CollectorBenefits, initChannelsVisual } from './components/CollectorBenefits.js';
import { CTA } from './components/CTA.js';
import { Footer } from './components/Footer.js';
import { Imprint } from './components/Imprint.js';
import { Privacy } from './components/Privacy.js';
import { ValueProps } from './components/ValueProps.js';
import { HowItWorks } from './components/HowItWorks.js';
import { VaultTour } from './components/VaultTour.js';
import { Ownership } from './components/Ownership.js';
import { Pricing, initPricingToggle } from './components/Pricing.js';
import { BetaSignup, initBetaSignup } from './components/BetaSignup.js';
import { getLanguage } from './utils/i18n.js';
import { applySeo } from './utils/seo.js';

const app = document.querySelector('#app');
let cleanupAnimations = [];
let currentView = null;
let revealObserver = null;

document.documentElement.lang = getLanguage();

// Nachgeladene Chunks mit Wiederholung: Schlägt ein import() fehl
// (Netz-Schluckauf, Cache-Wechsel während eines Deploys), verschwinden
// sonst alle Animationen dieses Chunks still. Bis zu zwei erneute
// Versuche mit Wartezeit beheben das in der Praxis.
function importWithRetry(importer, retries = 2, delayMs = 1500) {
  return importer().catch((err) => {
    if (retries <= 0) throw err;
    return new Promise((resolve) => setTimeout(resolve, delayMs))
      .then(() => importWithRetry(importer, retries - 1, delayMs * 2));
  });
}

// Three.js (~150 kB gzip) wird erst nach dem ersten Rendern nachgeladen,
// damit Inhalt und Styles sofort sichtbar sind.
let networkModule;
function loadNetworkAnimation() {
  networkModule ??= importWithRetry(() => import('./components/NetworkAnimation.js'))
    .catch((err) => {
      networkModule = null; // nächster Aufruf darf es erneut versuchen
      throw err;
    });
  return networkModule;
}

// Scroll-Reveal: Sektionen blenden beim Hereinscrollen ein. Die Klasse
// wird per JS gesetzt — ohne JS bleibt alles sichtbar (progressive
// enhancement).
function initReveal() {
  if (revealObserver) revealObserver.disconnect();
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) return;

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  document.querySelectorAll('main > section:not(.hero)').forEach((section) => {
    section.classList.add('reveal');
    revealObserver.observe(section);
  });
}

function render() {
  applySeo();
  const hash = window.location.hash;

  // Anker-Sprünge innerhalb der Startseite (#beta, #apps, …) lösen KEIN
  // Re-Rendering aus — sonst gingen Formular-Zustand, Scroll-Position
  // und laufende Animationen verloren.
  const view = hash === '#imprint' ? 'imprint' : hash === '#privacy' ? 'privacy' : 'home';
  if (view === 'home' && currentView === 'home') return;
  currentView = view;

  // Cleanup previous animations if they exist
  cleanupAnimations.forEach(cleanup => {
    if (typeof cleanup === 'function') cleanup();
  });
  cleanupAnimations = [];
  document.body.classList.remove('menu-open');

  if (view === 'imprint' || view === 'privacy') {
    app.innerHTML = `
      ${Header()}
      <main style="padding-top: 100px;">
        ${view === 'imprint' ? Imprint() : Privacy()}
      </main>
      ${Footer()}
    `;
    window.scrollTo(0, 0);
    initHeader();
  } else {
    app.innerHTML = `
      ${Header()}
      <main>
        ${Hero()}
        ${WhyNow()}
        ${FindYourArt()}
        ${CollectorBenefits()}
        ${ValueProps()}
        ${SemanticSpace()}
        ${SecondBrain()}
        ${MatchingSystem()}
        ${HowItWorks()}
        ${BetaSignup()}
        ${VaultTour()}
        ${Ownership()}
        ${Pricing()}
        ${CTA()}
      </main>
      ${Footer()}
    `;

    // Initialize interactions after DOM is updated
    requestAnimationFrame(() => {
      initHeader();
      initBetaSignup();
      initPricingToggle();
      initReveal();

      const channelsCleanup = initChannelsVisual();
      if (channelsCleanup) cleanupAnimations.push(channelsCleanup);

      importWithRetry(() => import('./components/BrainGraph.js')).then(({ initBrainGraph }) => {
        if (currentView !== 'home') return;
        const brainCleanup = initBrainGraph('brain-graph');
        if (brainCleanup) cleanupAnimations.push(brainCleanup);
      });

      importWithRetry(() => import('./components/DataSculpture.js')).then(({ initDataSculpture }) => {
        if (currentView !== 'home') return;
        const sculptureCleanup = initDataSculpture('data-sculpture');
        if (sculptureCleanup) cleanupAnimations.push(sculptureCleanup);
      });

      loadNetworkAnimation().then(({ initNetworkAnimation }) => {
        // Zwischenzeitlicher Wechsel auf Impressum/Datenschutz?
        if (currentView !== 'home') return;
        const heroCleanup = initNetworkAnimation('hero-network-animation');
        const semanticCleanup = initNetworkAnimation('semantic-network-animation', {
          particleColor: 0xffeb99, // Light yellow
          particleOpacity: 0.6,
          lineColor: 0xaaaa88, // Warm grey
          lineOpacity: 0.25
        });
        if (heroCleanup) cleanupAnimations.push(heroCleanup);
        if (semanticCleanup) cleanupAnimations.push(semanticCleanup);
      });
    });
  }
}

window.addEventListener('hashchange', render);
render();
