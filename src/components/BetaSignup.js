import { t } from '../utils/i18n.js';

// Beta-Anmeldung (gleiches Prinzip wie der Worpswede-Funnel):
// E-Mail-Adressen werden über /api/subscribe in Brevo gesammelt,
// um potenzielle Nutzer persönlich zum Beta-Programm einzuladen.
export function BetaSignup() {
  return `
    <section class="section beta-signup" id="beta">
      <div class="container">
        <div class="beta-grid">
          <div class="beta-text">
            <p class="beta-kicker">${t('betaSignup.kicker')}</p>
            <h2>${t('betaSignup.title')}</h2>
            <p class="lead">${t('betaSignup.lead')}</p>
            <ul class="beta-list">
              <li>${t('betaSignup.b1')}</li>
              <li>${t('betaSignup.b2')}</li>
              <li>${t('betaSignup.b3')}</li>
            </ul>
          </div>
          <div class="beta-card">
            <form id="beta-form" novalidate>
              <label for="beta-name">${t('betaSignup.nameLabel')} <span class="beta-optional">${t('betaSignup.optional')}</span></label>
              <input type="text" id="beta-name" name="name" autocomplete="given-name" placeholder="${t('betaSignup.namePh')}" />
              <label for="beta-email">${t('betaSignup.emailLabel')}</label>
              <input type="email" id="beta-email" name="email" autocomplete="email" required placeholder="${t('betaSignup.emailPh')}" />
              <input type="text" name="website" class="beta-hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <label class="beta-consent">
                <input type="checkbox" id="beta-consent" required />
                <span>${t('betaSignup.consent')}</span>
              </label>
              <button type="submit" class="btn btn-primary beta-submit">${t('betaSignup.submit')}</button>
              <p class="beta-msg" id="beta-msg" role="status"></p>
            </form>
            <div class="beta-success" id="beta-success" hidden>
              <p class="beta-success-emoji">🎨</p>
              <h3>${t('betaSignup.successTitle')}</h3>
              <p>${t('betaSignup.successText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initBetaSignup() {
  const form = document.getElementById('beta-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('beta-msg');
    const btn = form.querySelector('.beta-submit');
    const email = document.getElementById('beta-email').value.trim();
    const consent = document.getElementById('beta-consent');
    msg.textContent = '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      msg.textContent = t('betaSignup.errorInvalid');
      return;
    }
    if (!consent.checked) {
      msg.textContent = t('betaSignup.errorConsent');
      return;
    }

    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = '…';
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          name: document.getElementById('beta-name').value.trim(),
          source: 'postyour.art-beta',
          website: form.querySelector('.beta-hp').value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.hidden = true;
        document.getElementById('beta-success').hidden = false;
      } else {
        msg.textContent = data.error === 'invalid_email'
          ? t('betaSignup.errorInvalid')
          : t('betaSignup.errorServer');
      }
    } catch {
      msg.textContent = t('betaSignup.errorServer');
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}
