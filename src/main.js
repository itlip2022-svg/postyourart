import '@fontsource/outfit/400.css';
import '@fontsource/outfit/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import './styles/global.css';
import './styles/components.css';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { WhyNow } from './components/WhyNow.js';
import { SemanticSpace } from './components/SemanticSpace.js';
import { MatchingSystem } from './components/MatchingSystem.js';
import { ArtistTools } from './components/ArtistTools.js';
import { CollectorBenefits } from './components/CollectorBenefits.js';
import { WhyAI } from './components/WhyAI.js';
import { International } from './components/International.js';
import { BrandConnection } from './components/BrandConnection.js';
import { CTA } from './components/CTA.js';
import { Footer } from './components/Footer.js';
import { Imprint } from './components/Imprint.js';
import { Privacy } from './components/Privacy.js';

const app = document.querySelector('#app');

function render() {
  const hash = window.location.hash;

  if (hash === '#imprint') {
    app.innerHTML = `
      ${Header()}
      <main style="padding-top: 80px;">
        ${Imprint()}
      </main>
      ${Footer()}
    `;
    window.scrollTo(0, 0);
  } else if (hash === '#privacy') {
    app.innerHTML = `
      ${Header()}
      <main style="padding-top: 80px;">
        ${Privacy()}
      </main>
      ${Footer()}
    `;
    window.scrollTo(0, 0);
  } else {
    app.innerHTML = `
      ${Header()}
      <main>
        ${Hero()}
        ${WhyNow()}
        ${SemanticSpace()}
        ${MatchingSystem()}
        ${ArtistTools()}
        ${CollectorBenefits()}
        ${WhyAI()}
        ${International()}
        ${BrandConnection()}
        ${CTA()}
      </main>
      ${Footer()}
    `;
  }
}

window.addEventListener('hashchange', render);
render();
