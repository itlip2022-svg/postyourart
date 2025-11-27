export function Footer() {
  return `
    <footer class="footer section">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">postyour.art</div>
            <p>The Semantic Art Space. Connecting artists and collectors through intelligence and emotion.</p>
          </div>
          <div class="footer-links">
            <h4>Platform</h4>
            <a href="#mission">Mission</a>
            <a href="#technology">Technology</a>
            <a href="#artists">For Artists</a>
            <a href="#collectors">For Collectors</a>
          </div>
          <div class="footer-links">
            <h4>Network</h4>
            <a href="https://lippeck.art" target="_blank">lippeck.art</a>
            <a href="https://artclub.community" target="_blank">artclub.community</a>
          </div>
          <div class="footer-links">
            <h4>Legal</h4>
            <a href="#imprint">Imprint</a>
            <a href="#privacy">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} postyour.art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
