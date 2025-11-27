export function SemanticSpace() {
  return `
    <section class="section semantic-space" id="technology">
      <div class="container">
        <div class="grid-2">
          <div class="content-col">
            <h2 class="section-title">The Semantic Art Space</h2>
            <p class="lead">We are building a neural system for art – an infrastructure that creates orientation.</p>
            <ul class="feature-list">
              <li>
                <strong>Knowledge Graph for Art</strong>
                <p>Connecting works based on deep semantic relationships.</p>
              </li>
              <li>
                <strong>Style, Motif & Structure Recognition</strong>
                <p>AI-supported analysis beyond keywords.</p>
              </li>
              <li>
                <strong>Human Curation</strong>
                <p>Data becomes the map, experts set the direction.</p>
              </li>
            </ul>
          </div>
          <div class="visual-col">
             <div class="graph-visual">
               <img src="/assets/semantic_graph.png" alt="Semantic Graph" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
             </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
