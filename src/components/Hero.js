export function Hero() {
  return `
    <section class="hero section">
      <div class="container hero-content">
        <div class="hero-text">
          <p class="hero-collab">Powered by <a href="https://lippeck.art" target="_blank">lippeck.art</a> – In cooperation with <a href="https://artclub.community" target="_blank">artclub.community</a></p>
          <h1 class="hero-title">We are building the first <span class="text-gradient">Semantic Art Space</span>.</h1>
          <p class="hero-subtitle">Human curation meets AI – Art that finds you.</p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg">Get Early Access</button>
          </div>
        </div>
        <div class="hero-visual">
          <!-- Placeholder for neural network visual -->
          <div id="hero-network-animation" class="neural-network-placeholder"></div>
        </div>
      </div>
    </section>
  `;
}
