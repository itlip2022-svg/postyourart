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
  const particleCount = 60;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  const range = 60;

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * range;
    positions[i * 3 + 1] = (Math.random() - 0.5) * range;
    positions[i * 3 + 2] = (Math.random() - 0.5) * range;

    velocities.push({
      x: (Math.random() - 0.5) * 0.05,
      y: (Math.random() - 0.5) * 0.05,
      z: (Math.random() - 0.5) * 0.05
    });
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Material for particles
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffaa00, // Primary accent color
    size: 0.5,
    transparent: true,
    opacity: 0.8
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.15
  });

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
  }

  document.addEventListener('mousemove', onDocumentMouseMove);

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

  function animate() {
    animationId = requestAnimationFrame(animate);

    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;

    // Rotate the whole system slightly based on mouse
    particleSystem.rotation.y += 0.05 * (targetX - particleSystem.rotation.y) * 0.01;
    particleSystem.rotation.x += 0.05 * (targetY - particleSystem.rotation.x) * 0.01;

    // Update particles
    const positions = particleSystem.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      // Update positions based on velocity
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Boundary checks - bounce back
      if (Math.abs(positions[i * 3]) > range / 2) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > range / 2) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > range / 2) velocities[i].z *= -1;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Draw lines between close particles
    // Note: Creating lines every frame is expensive. 
    // For better performance, we should use a pre-allocated line buffer or a shader.
    // However, for 60 particles, rebuilding geometry might be acceptable for this MVP.
    // Let's try a slightly more optimized approach: using a single LineSegments object and updating it.
    
    updateLines();

    renderer.render(scene, camera);
  }

  // Lines setup
  const maxConnections = particleCount * particleCount; // Worst case
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(maxConnections * 3); // 2 points per line, 3 coords per point
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  function updateLines() {
    const positions = particleSystem.geometry.attributes.position.array;
    let vertexIndex = 0;
    const connectionDistance = 15;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectionDistance * connectionDistance) {
            // Add line segment
            linePositions[vertexIndex++] = positions[i * 3];
            linePositions[vertexIndex++] = positions[i * 3 + 1];
            linePositions[vertexIndex++] = positions[i * 3 + 2];

            linePositions[vertexIndex++] = positions[j * 3];
            linePositions[vertexIndex++] = positions[j * 3 + 1];
            linePositions[vertexIndex++] = positions[j * 3 + 2];
        }
      }
    }

    linesMesh.geometry.setDrawRange(0, vertexIndex / 3);
    linesMesh.geometry.attributes.position.needsUpdate = true;
  }

  animate();

  // Cleanup function
  return function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('mousemove', onDocumentMouseMove);
    
    if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
    }
    
    // Dispose Three.js resources
    particleMaterial.dispose();
    lineMaterial.dispose();
    particles.dispose();
    lineGeometry.dispose();
    renderer.dispose();
  };
}
