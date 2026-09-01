import { t } from '../utils/i18n.js';

// findyour.art — eigene Sektion: Live-Anbindung an die Vault (Shop,
// Galerietexte, Künstlerseite) plus der Erlebnis-Block: Kunst wird in
// begehbaren 3D-Welten präsentiert — Infotainment statt Verkaufsportal,
// später auch am TV und mit VR-Brille. Als Live-Beispiel wird die
// 3D-Welt von findyour.art auf Klick per iframe geladen (initFyaWorld).

const FYA_WORLD_URL = 'https://findyour.art/kuenstler/markus-lippeck';

export function FindYourArt() {
  const card = (key) => `
    <div class="card">
      <h3>${t(`findyourart.cards.${key}.title`)}</h3>
      <p>${t(`findyourart.cards.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section findyourart" id="findyourart">
      <div class="container text-center">
        <h2 class="section-title">${t('findyourart.title')}</h2>
        <p class="lead">${t('findyourart.lead')}</p>

        <div class="fya-experience">
          <div class="fya-experience-text">
            <h3>${t('findyourart.experience.title')}</h3>
            <p>${t('findyourart.experience.text')}</p>
            <a href="${FYA_WORLD_URL}" target="_blank" rel="noopener" class="btn btn-outline">${t('findyourart.experience.open')}</a>
          </div>
          <figure class="fya-world-figure">
            <div class="fya-world" id="fya-world">
              <button type="button" class="fya-world-start" id="fya-world-start">
                <span class="fya-world-play" aria-hidden="true">▶</span>
                ${t('findyourart.experience.start')}
              </button>
            </div>
            <figcaption class="fya-world-caption">${t('findyourart.experience.caption')}</figcaption>
          </figure>
        </div>

        <div class="grid-3" style="margin-top: 2.5rem; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); text-align: left;">
          ${card('c1')}
          ${card('c2')}
          ${card('c3')}
          ${card('c4')}
        </div>
        <div class="mt-lg">
          <a href="https://findyour.art/" target="_blank" rel="noopener" class="btn btn-primary btn-lg">${t('findyourart.btn')}</a>
        </div>
      </div>
    </section>
  `;
}

// Die 3D-Welt erst auf Klick laden — sie ist eine vollwertige WebGL-Szene
// und soll weder Ladezeit noch Akku kosten, solange niemand sie ansieht.
export function initFyaWorld() {
  const box = document.getElementById('fya-world');
  const start = document.getElementById('fya-world-start');
  if (!box || !start) return;

  start.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = FYA_WORLD_URL;
    frame.title = t('findyourart.experience.caption');
    frame.loading = 'lazy';
    frame.allow = 'fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer';
    frame.setAttribute('allowfullscreen', '');
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    box.replaceChildren(frame);
    box.classList.add('loaded');
  }, { once: true });
}
