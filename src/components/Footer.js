export function Footer() {
    return `
    <footer class="footer section">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">ArtTech</div>
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
            <a href="#">Imprint</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ArtTech Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
