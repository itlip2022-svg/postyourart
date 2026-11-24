import { t } from '../utils/i18n.js';

// Wer dahintersteht — stark vereinfachte Zusammenfassung von
// findyour.art/mas-art (Anna Schill, Markus Lippeck, das Haus) und
// findyour.art/schluh-art (der gemeinnützige Kunstverein, euroart, Italien).
// Letzter Abschnitt der Seite; nutzt die Karten-/Link-Stile der übrigen
// Netzwerk-Sektionen.
export function About() {
  const person = (key) => `
    <div class="card about-person">
      <h3>${t(`about.people.${key}.name`)}</h3>
      <p class="about-role">${t(`about.people.${key}.role`)}</p>
      <p>${t(`about.people.${key}.text`)}</p>
    </div>
  `;
  const tile = (key) => `
    <div class="card why-network-card">
      <h3>${t(`about.tiles.${key}.title`)}</h3>
      <p>${t(`about.tiles.${key}.text`)}</p>
    </div>
  `;
  return `
    <section class="section about" id="ueber-uns">
      <div class="container text-center">
        <p class="contact-kicker">${t('about.kicker')}</p>
        <h2 class="section-title">${t('about.title')}</h2>
        <p class="lead" style="max-width: 760px; margin-left: auto; margin-right: auto;">${t('about.lead')}</p>

        <div class="about-photos">
          ${[
            ['anna-markus-illustration', 'illustration'],
            ['anna-markus', 'selfie'],
            ['galerie-worpswede', 'gallery'],
            ['worpswede-next', 'logo'],
          ].map(([file, key]) => `
            <figure class="about-photo about-photo-${key}">
              <img src="/about/${file}.webp" alt="${t(`about.photos.${key}`)}" loading="lazy" decoding="async">
            </figure>
          `).join('')}
        </div>

        <div class="about-people">
          ${person('anna')}
          ${person('markus')}
        </div>

        <div class="grid-3" style="margin-top: 1rem;">
          ${tile('house')}
          ${tile('verein')}
          ${tile('europe')}
        </div>

        <p class="section-links">
          <a href="https://findyour.art/mas-art" target="_blank" rel="noopener">${t('about.linkMasart')} →</a>
          <a href="https://findyour.art/schluh-art" target="_blank" rel="noopener">${t('about.linkVerein')} →</a>
          <a href="https://findyour.art/art-residence" target="_blank" rel="noopener">${t('about.linkResidence')} →</a>
        </p>
      </div>
    </section>
  `;
}
