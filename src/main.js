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

document.querySelector('#app').innerHTML = `
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
`
