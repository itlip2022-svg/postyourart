import { t } from '../utils/i18n.js';

export function Sponsors() {
  const sponsors = [
    {
      name: "euroart",
      url: "https://www.euroart.eu/",
      image: "https://schluh.art/cdn/shop/files/Bildschirmfoto_2025-08-06_um_23.29.55.png?v=1754515811&width=3000"
    },
    {
      name: "Landschaftsverband",
      url: "https://www.landschaftsverband-stade.de/",
      image: "https://schluh.art/cdn/shop/files/LSV-Logo_mit-zentrierter-Schrift_2560x1048px.jpg?v=1754516055&width=3000"
    },
    {
      name: "worpswede die gemeinde",
      url: "https://www.gemeinde-worpswede.de/",
      image: "https://schluh.art/cdn/shop/files/worps_logo.png?v=1754516652&width=3000"
    },
    {
      name: "MARKUS LIPPECK",
      url: "https://lippeck.art/",
      image: "https://schluh.art/cdn/shop/files/Bildschirmfoto_2025-08-06_um_23.23.13.png?v=1754515413&width=3000"
    },
    {
      name: "Galerie Schluh",
      url: "https://schluh.art/",
      image: "https://schluh.art/cdn/shop/files/Bildschirm_foto2024-02-13um21.21.45_2a04b0ce-ceeb-4303-85a3-3ba33b1c1222.png?v=1711063001&width=400"
    }
  ];

  return `
    <section class="sponsors-section">
      <div class="sponsors-container">
        <div class="sponsors-grid">
          ${sponsors.map(sponsor => `
            <a href="${sponsor.url}" target="_blank" rel="noopener noreferrer" class="sponsor-link" title="${sponsor.name}">
              <img src="${sponsor.image}" alt="${sponsor.name}" class="sponsor-logo" loading="lazy">
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
