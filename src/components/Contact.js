import { t } from '../utils/i18n.js';

// Kontakt — gleiche Daten und gleiche Haltung wie findyour.art/kontakt:
// kein Formular, ein Klick öffnet Messenger, Mail oder Telefon. WhatsApp
// und Telegram sind reine Verweise, es lädt nichts von deren Servern,
// bevor jemand klickt.
export const CONTACT = {
  email: 'markus@lippeck.de',
  mobile: '+49 162 6412632',
  mobileHref: 'tel:+491626412632',
  gallery: '+49 4792 9899544',
  galleryHref: 'tel:+4947929899544',
  whatsapp: 'https://wa.me/491626412632',
  telegram: 'https://t.me/+491626412632',
  map: 'https://www.openstreetmap.org/search?query=Im%20Schluh%2071%2C%2027726%20Worpswede',
};

export const SOCIAL = [
  { key: 'instagram', label: 'Instagram', handle: '@markus.lippeck', href: 'https://www.instagram.com/markus.lippeck/' },
  { key: 'youtube', label: 'YouTube', handle: '@Markus.Lippeck', href: 'https://www.youtube.com/@Markus.Lippeck' },
  { key: 'pinterest', label: 'Pinterest', handle: 'markus_lippeck', href: 'https://de.pinterest.com/markus_Lippeck/' },
];

const svg = (paths) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const ICONS = {
  whatsapp: svg('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
  telegram: svg('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
  mail: svg('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
  phone: svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'),
  pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
  instagram: svg('<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'),
  youtube: svg('<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'),
  pinterest: svg('<circle cx="12" cy="12" r="10"/><path d="M11 21l2-9"/><path d="M9.6 13.6c-1-1-1.3-2.3-.9-3.6.6-1.9 2.6-3 4.6-2.6s3.2 2.2 2.8 4.2c-.3 1.6-1.4 2.9-2.9 2.9"/>'),
};

export function Contact() {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(t('contact.waGreeting'))}`;
  const quick = [
    { icon: ICONS.whatsapp, title: 'WhatsApp', text: t('contact.waText'), href: wa, ext: true },
    { icon: ICONS.telegram, title: 'Telegram', text: t('contact.tgText'), href: CONTACT.telegram, ext: true },
    { icon: ICONS.mail, title: t('contact.mailTitle'), text: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: ICONS.phone, title: t('contact.callTitle'), text: CONTACT.mobile, href: CONTACT.mobileHref },
  ].map((q) => `
    <a class="card contact-quick" href="${q.href}"${q.ext ? ' target="_blank" rel="noopener"' : ''}>
      <span class="contact-icon">${q.icon}</span>
      <strong>${q.title}</strong>
      <span>${q.text}</span>
    </a>
  `).join('');

  const social = SOCIAL.map((s) => `
    <a class="contact-social" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label} ${s.handle}">
      ${ICONS[s.key]}
      <span><strong>${s.label}</strong>${s.handle}</span>
    </a>
  `).join('');

  return `
    <section class="section contact" id="kontakt">
      <div class="container">
        <div class="text-center">
          <p class="contact-kicker">${t('contact.kicker')}</p>
          <h2 class="section-title">${t('contact.title')}</h2>
          <p class="lead" style="max-width: 720px;">${t('contact.lead')}</p>
        </div>

        <div class="contact-quick-grid">${quick}</div>

        <div class="contact-details">
          <div class="card contact-place">
            <span class="contact-icon">${ICONS.pin}</span>
            <h3>${t('contact.placeTitle')}</h3>
            <p>${t('contact.placeText')}</p>
            <a href="${CONTACT.map}" target="_blank" rel="noopener" class="contact-maplink">${t('contact.mapLink')} ↗</a>
          </div>
          <div class="card contact-address">
            <address>
              <strong>Lippeck GmbH</strong><br>
              Im Schluh 71<br>
              27726 Worpswede
            </address>
            <dl class="contact-lines">
              <dt>${t('contact.mobile')}</dt><dd><a href="${CONTACT.mobileHref}">${CONTACT.mobile}</a></dd>
              <dt>${t('contact.gallery')}</dt><dd><a href="${CONTACT.galleryHref}">${CONTACT.gallery}</a></dd>
              <dt>${t('contact.mailTitle')}</dt><dd><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></dd>
            </dl>
            <div class="contact-social-row">${social}</div>
          </div>
        </div>

        <p class="contact-privacy">${t('contact.privacy')}</p>
      </div>
    </section>
  `;
}
