import * as THREE from 'three';

export function initNetworkAnimation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  // Transparent background to blend with CSS gradient
  scene.background = null;

  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 50;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particles
  const particleCount = 350; // Massively increased for full background width
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  const initialPositions = []; // Store initial positions for spring effect

  const rangeX = 180; // Wider range for full width
  const rangeY = 80;

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * rangeX;
    const y = (Math.random() - 0.5) * rangeY;
    const z = (Math.random() - 0.5) * 40;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPositions.push(new THREE.Vector3(x, y, z));

    velocities.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1
    ));
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Material for particles - dunkler und blasser (darker and paler)
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x888888, // Muted cool grey
    size: 0.7,
    transparent: true,
    opacity: 0.35, // Paler
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x666666, // Darker
    transparent: true,
    opacity: 0.12, // Paler
    blending: THREE.AdditiveBlending
  });

  // Mouse interaction
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let intersectionPoint = new THREE.Vector3(0, 0, 0);
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Intersection plane

  // Use the section as hit area instead of just the container div to detect mouse over the whole hero
  const hitArea = container.closest('.hero.section') || container;

  function onDocumentMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) relative to container
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast to find intersection point on the Z=0 plane
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
  }

  function onMouseLeave() {
    intersectionPoint.set(0, 0, 0); // Reset towards center when mouse leaves
  }

  hitArea.addEventListener('mousemove', onDocumentMouseMove);
  hitArea.addEventListener('mouseleave', onMouseLeave);

  // Resize handler
  function onWindowResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', onWindowResize);

  // Animation loop
  let animationId;
  const clock = new THREE.Clock();

  // Lines setup optimized
  const maxConnections = particleCount * 5; // Limit max connections per particle on average
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(maxConnections * 3 * 2); // 2 points per line
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  function animate() {
    animationId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Gentle global rotation
    particleSystem.rotation.y = Math.sin(time * 0.1) * 0.2;
    particleSystem.rotation.x = Math.cos(time * 0.15) * 0.2;

    const positions = particleSystem.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const currentPos = new THREE.Vector3(positions[idx], positions[idx + 1], positions[idx + 2]);
      const initialPos = initialPositions[i];
      const velocity = velocities[i];

      // Swarm behavior towards mouse intersection point
      const dirToMouse = new THREE.Vector3().subVectors(intersectionPoint, currentPos);
      const distToMouse = dirToMouse.length();

      // If mouse is interacting (intersection pt not 0,0,0) forcefully pull particles towards it
      if (intersectionPoint.length() > 0.1) {
        if (distToMouse < 80) { // Massive interaction radius
          const pullStrength = (80 - distToMouse) * 0.05; // Extremely strong pull
          velocity.add(dirToMouse.normalize().multiplyScalar(pullStrength));
        }
      }

      // Spring back to original position to keep shape roughly intact (much weaker spring so mouse dominates)
      const dirToHome = new THREE.Vector3().subVectors(initialPos, currentPos);
      velocity.add(dirToHome.multiplyScalar(0.002));

      // Add a bit of noise directly to velocity based on time
      velocity.x += Math.sin(time * 2 + i) * 0.01;
      velocity.y += Math.cos(time * 2.5 + i) * 0.01;

      // Apply friction (damping)
      velocity.multiplyScalar(0.92);

      // Update positions
      positions[idx] += velocity.x;
      positions[idx + 1] += velocity.y;
      positions[idx + 2] += velocity.z;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    updateLines();

    renderer.render(scene, camera);
  }

  function updateLines() {
    const positions = particleSystem.geometry.attributes.position.array;
    let vertexIndex = 0;
    const connectionDistance = 12; // Shorter distance for denser but localized web

    for (let i = 0; i < particleCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < particleCount; j++) {
        // Limit connections to prevent "hairball" look
        if (connections > 4) break;

        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectionDistance * connectionDistance) {
          linePositions[vertexIndex++] = positions[i * 3];
          linePositions[vertexIndex++] = positions[i * 3 + 1];
          linePositions[vertexIndex++] = positions[i * 3 + 2];

          linePositions[vertexIndex++] = positions[j * 3];
          linePositions[vertexIndex++] = positions[j * 3 + 1];
          linePositions[vertexIndex++] = positions[j * 3 + 2];
          connections++;
        }
      }
    }

    linesMesh.geometry.setDrawRange(0, vertexIndex / 3);
    linesMesh.geometry.attributes.position.needsUpdate = true;
  }

  animate();

  return function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onWindowResize);

    if (hitArea) {
      hitArea.removeEventListener('mousemove', onDocumentMouseMove);
      hitArea.removeEventListener('mouseleave', onMouseLeave);
    }

    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }

    particleMaterial.dispose();
    lineMaterial.dispose();
    particles.dispose();
    lineGeometry.dispose();
    renderer.dispose();
  };
}
