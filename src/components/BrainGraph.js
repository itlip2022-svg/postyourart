import * as THREE from 'three';

// Kachel-Animation der Second-Brain-Sektion: ein kleines Gehirn aus
// Knoten und Verbindungen im Stil einer Obsidian-Graphenansicht, das
// sich langsam dreidimensional dreht. Der Graph ist starr (Kanten werden
// einmal berechnet), nur die Gruppe rotiert — dadurch sehr günstig im
// Rendering. Respektiert prefers-reduced-motion (statisches Einzelbild).
export function initBrainGraph(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 200);
  camera.position.z = 26;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ── Gehirnform: Punkte auf/in einem Ellipsoid, mit Längsfurche
  // (Hemisphären), abgeflachter Unterseite und Kleinhirn hinten unten.
  const NODE_COUNT = 170;
  const SX = 8.5, SY = 7, SZ = 11; // Breite, Höhe, Länge

  function brainPoint() {
    // Kleinhirn: ~14% der Punkte
    if (Math.random() < 0.14) {
      const v = randomInUnitBall(0.9);
      return new THREE.Vector3(v.x * 4, -4 + v.y * 2.6, -7.5 + v.z * 3.2);
    }
    // Großhirn: Punkte bevorzugt nahe der Oberfläche (Kortex)
    const v = randomInUnitBall(Math.random() < 0.65 ? 0.78 : 0.35);
    let x = v.x * SX, y = v.y * SY, z = v.z * SZ;
    // Längsfurche: Punkte von der Mittelebene wegdrücken
    x += Math.sign(x || 1) * 0.8 * Math.exp(-(x * x) / 6);
    // Unterseite abflachen
    const floor = -0.55 * SY;
    if (y < floor) y = floor + (y - floor) * 0.25;
    return new THREE.Vector3(x, y, z);
  }

  function randomInUnitBall(minR) {
    // Richtung gleichverteilt, Radius zwischen minR und 1
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const r = minR + (1 - minR) * Math.cbrt(Math.random());
    return new THREE.Vector3(s * Math.cos(phi) * r, u * r, s * Math.sin(phi) * r);
  }

  const nodes = Array.from({ length: NODE_COUNT }, brainPoint);

  // ── Kanten: jeder Knoten mit seinen 2 nächsten Nachbarn (dedupliziert)
  const edgeSet = new Set();
  nodes.forEach((p, i) => {
    const near = nodes
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceToSquared(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    near.forEach(({ j }) => edgeSet.add(i < j ? `${i}-${j}` : `${j}-${i}`));
  });

  const linePositions = new Float32Array(edgeSet.size * 6);
  let li = 0;
  edgeSet.forEach((key) => {
    const [i, j] = key.split('-').map(Number);
    linePositions.set([...nodes[i].toArray(), ...nodes[j].toArray()], li);
    li += 6;
  });

  const group = new THREE.Group();

  // Normale Knoten + größere "Hubs" (wie oft verlinkte Notizen im Graph)
  const hubIdx = new Set();
  while (hubIdx.size < Math.floor(NODE_COUNT * 0.09)) hubIdx.add(Math.floor(Math.random() * NODE_COUNT));

  function pointsFor(indices, size, opacity) {
    const geo = new THREE.BufferGeometry().setFromPoints(indices.map((i) => nodes[i]));
    const mat = new THREE.PointsMaterial({
      color: 0xff9e2c, size, transparent: true, opacity, blending: THREE.AdditiveBlending,
    });
    return { mesh: new THREE.Points(geo, mat), geo, mat };
  }

  const all = [...nodes.keys()];
  const normal = pointsFor(all.filter((i) => !hubIdx.has(i)), 0.42, 0.75);
  const hubs = pointsFor(all.filter((i) => hubIdx.has(i)), 0.95, 0.95);

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffb45e, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);

  group.add(normal.mesh, hubs.mesh, lines);
  group.rotation.x = 0.28; // leicht von oben angeschaut
  scene.add(group);

  function onResize() {
    if (!container.clientWidth) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock();
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    group.rotation.y = time * 0.35;
    group.rotation.x = 0.28 + Math.sin(time * 0.4) * 0.07;
    renderer.render(scene, camera);
  }

  if (prefersReduced) {
    group.rotation.y = 0.7;
    renderer.render(scene, camera);
  } else {
    animate();
  }

  return function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    normal.geo.dispose(); normal.mat.dispose();
    hubs.geo.dispose(); hubs.mat.dispose();
    lineGeo.dispose(); lineMat.dispose();
    renderer.dispose();
  };
}
