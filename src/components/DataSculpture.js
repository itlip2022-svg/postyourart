import * as THREE from 'three';

// Kachel-Animation der Sektion „Deine Daten. Dein Wert.": eine abstrakte
// Skulptur (Torus-Knoten) aus leuchtenden Datenpunkten mit feinem
// Drahtgitter, die sich langsam dreidimensional dreht. Starre Geometrie,
// nur die Gruppe rotiert; respektiert prefers-reduced-motion.
export function initDataSculpture(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 200);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();

  // Dichte Punktwolke auf der Oberfläche des Knotens ("Datenpunkte")
  const pointGeo = new THREE.TorusKnotGeometry(5.6, 1.7, 190, 20, 2, 3);
  const pointMat = new THREE.PointsMaterial({
    color: 0xff9e2c, size: 0.22, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(pointGeo, pointMat);

  // Feines Drahtgitter in geringerer Auflösung als "Form" der Skulptur
  const wireGeo = new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(5.6, 1.7, 72, 10, 2, 3));
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xffb45e, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending,
  });
  const wire = new THREE.LineSegments(wireGeo, wireMat);

  group.add(points, wire);
  group.rotation.x = 0.4;
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
    group.rotation.y = time * 0.3;
    group.rotation.x = 0.4 + Math.sin(time * 0.35) * 0.12;
    renderer.render(scene, camera);
  }

  if (prefersReduced) {
    group.rotation.y = 0.9;
    renderer.render(scene, camera);
  } else {
    animate();
  }

  return function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    pointGeo.dispose(); pointMat.dispose();
    wireGeo.dispose(); wireMat.dispose();
    renderer.dispose();
  };
}
