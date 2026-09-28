<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as THREE from "three";

const canvas = ref(null);
let renderer;
let scene;
let camera;
let developmentGroup;
let animationFrame = 0;
let resizeObserver;
let visibilityHandler;
let lastScrollY = 0;
let scrollDirection = 0;
let scrollAmount = 0;
let pointer = { x: 0, y: 0 };
let targetRotation = 0;
let geometries = [];
let materials = [];

function box(w, h, d) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  geometries.push(geometry);
  return geometry;
}

function material(color, options = {}) {
  const value = new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.12, ...options });
  materials.push(value);
  return value;
}

function addBox(parent, dimensions, position, surface, rotationY = 0) {
  const item = new THREE.Mesh(box(...dimensions), surface);
  item.position.set(...position);
  item.rotation.y = rotationY;
  item.castShadow = true;
  item.receiveShadow = true;
  parent.add(item);
  return item;
}

function makeTower(parent, x, z, index, floorHeight, shell, balcony, glass, crown) {
  const tower = new THREE.Group();
  tower.position.set(x, 0.42, z);
  parent.add(tower);

  const width = index % 2 ? 1.72 : 1.9;
  const depth = 1.72;
  const windowWidth = 0.34;
  const transform = new THREE.Object3D();
  const floorBands = new THREE.InstancedMesh(box(width, floorHeight * 0.75, depth), shell, 17);
  const panes = new THREE.InstancedMesh(box(windowWidth, 0.17, 0.035), glass, 51);
  const ledges = new THREE.InstancedMesh(box(width * 0.88, 0.055, 0.3), balcony, 9);
  const tints = [new THREE.Color("#547bb5"), new THREE.Color("#73b8d2"), new THREE.Color("#7769c8")];
  let paneIndex = 0;
  let ledgeIndex = 0;

  for (let level = 0; level < 17; level += 1) {
    const y = floorHeight * level + floorHeight * 0.5;
    transform.position.set(0, y, 0);
    transform.rotation.set(0, index % 3 === 0 ? -0.035 : 0.025, 0);
    transform.updateMatrix();
    floorBands.setMatrixAt(level, transform.matrix);

    // Recessed windows and balcony ledges break each tower into readable storeys.
    for (let pane = 0; pane < 3; pane += 1) {
      transform.position.set((pane - 1) * (windowWidth + 0.12), y, depth * 0.5 + 0.026);
      transform.rotation.set(0, 0, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      panes.setMatrixAt(paneIndex, transform.matrix);
      panes.setColorAt(paneIndex, tints[(level + pane + index) % tints.length]);
      paneIndex += 1;
    }
    if (level % 2 === 0 || level === 16) {
      transform.position.set(0, y - floorHeight * 0.34, depth * 0.5 + 0.12);
      transform.updateMatrix();
      ledges.setMatrixAt(ledgeIndex, transform.matrix);
      ledgeIndex += 1;
    }
  }

  floorBands.instanceMatrix.needsUpdate = true;
  panes.instanceMatrix.needsUpdate = true;
  panes.instanceColor.needsUpdate = true;
  ledges.instanceMatrix.needsUpdate = true;
  floorBands.castShadow = floorBands.receiveShadow = true;
  panes.castShadow = ledges.castShadow = true;
  tower.add(floorBands, panes, ledges);

  const top = floorHeight * 17;
  addBox(tower, [width + 0.16, 0.17, depth + 0.12], [0, top + 0.08, 0], crown);
  addBox(tower, [0.1, 0.75, 0.1], [width * 0.38, top + 0.48, 0], crown);
}

function createScene() {
  scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight("#ffffff", "#7185a9", 2.2));

  const sun = new THREE.DirectionalLight("#e4e5ff", 4.2);
  sun.position.set(-8, 16, 12);
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#65d5e4", 1.8);
  fill.position.set(12, 7, -10);
  scene.add(fill);

  camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
  camera.position.set(18, 16, 31);
  camera.lookAt(0, 4.2, 0);

  const development = new THREE.Group();
  developmentGroup = development;
  scene.add(development);

  const podium = material("#cfdae9", { roughness: 0.9 });
  const towerShell = material("#f4f7fb", { roughness: 0.65, metalness: 0.04 });
  const towerShellAlt = material("#dce5f4", { roughness: 0.62, metalness: 0.05 });
  const balcony = material("#fdfdff", { roughness: 0.52, metalness: 0.08 });
  const window = material("#ffffff", { color: "#ffffff", vertexColors: true, roughness: 0.3, metalness: 0.28, emissive: "#5592bd", emissiveIntensity: 0.18 });
  const darkTrim = material("#6c5dc3", { roughness: 0.58, metalness: 0.2 });
  const landscape = material("#72948a", { roughness: 0.95 });
  const pool = material("#57bfd8", { roughness: 0.2, metalness: 0.25, transparent: true, opacity: 0.92 });

  addBox(development, [16.8, 0.42, 8.6], [0, 0.1, -0.1], podium);
  addBox(development, [6.1, 0.22, 0.14], [0, 0.43, 1.75], darkTrim);
  addBox(development, [4.6, 0.08, 1.8], [0.1, 0.47, 3.15], pool);
  addBox(development, [3.4, 0.16, 1.05], [-5.6, 0.46, 2.5], landscape);
  addBox(development, [3.2, 0.16, 1.05], [5.8, 0.46, -2.3], landscape);

  const xPositions = [-5, 0, 5];
  const zPositions = [-2.7, 2.65];
  let index = 0;
  for (const z of zPositions) {
    for (const x of xPositions) {
      makeTower(development, x, z, index, 0.42, index % 2 ? towerShellAlt : towerShell, balcony, window, darkTrim);
      index += 1;
    }
  }

  // A fine luminous site grid gives the architectural massing a quiet scale reference.
  const grid = new THREE.GridHelper(42, 28, "#8db4cc", "#d1e0ea");
  grid.position.set(0, -0.14, 0);
  grid.material.transparent = true;
  grid.material.opacity = 0.19;
  scene.add(grid);

  const site = new THREE.Mesh(box(45, 0.04, 45), material("#e3eef4", { roughness: 0.98 }));
  site.position.set(0, -0.24, 0);
  site.receiveShadow = true;
  scene.add(site);

  return development;
}

function sizeRenderer() {
  if (!renderer || !canvas.value) return;
  const bounds = canvas.value.getBoundingClientRect();
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.fov = width < 620 ? 43 : width < 1000 ? 37 : 32;
  camera.updateProjectionMatrix();
}

function handleScroll() {
  const currentY = window.scrollY;
  scrollDirection = Math.sign(currentY - lastScrollY);
  lastScrollY = currentY;
  const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  scrollAmount = THREE.MathUtils.clamp(currentY / scrollRange, 0, 1);
  // One complete turn across the page; scrolling back up reverses the rotation.
  targetRotation = scrollAmount * Math.PI * 2;
  document.documentElement.dataset.scrollDirection = scrollDirection > 0 ? "down" : scrollDirection < 0 ? "up" : "idle";
}

function handlePointer(event) {
  pointer.x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
  pointer.y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
}

function render() {
  if (!renderer || !camera) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ease = reducedMotion ? 1 : 0.035;
  camera.position.x += ((18 + scrollAmount * 1.9 + pointer.x * 0.55) - camera.position.x) * ease;
  camera.position.y += ((16 + scrollAmount * 2.5 - pointer.y * 0.28 + scrollDirection * 0.36) - camera.position.y) * ease;
  camera.position.z += ((31 - scrollAmount * 2.1) - camera.position.z) * ease;
  const rotationEase = reducedMotion ? 1 : 0.075;
  developmentGroup.rotation.y += (targetRotation - developmentGroup.rotation.y) * rotationEase;
  camera.lookAt(0, 4.2 + scrollAmount * 0.7, 0);
  renderer.render(scene, camera);
  if (!document.hidden) animationFrame = requestAnimationFrame(render);
}

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  createScene();
  sizeRenderer();

  resizeObserver = new ResizeObserver(sizeRenderer);
  resizeObserver.observe(canvas.value.parentElement);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
  window.addEventListener("pointermove", handlePointer, { passive: true });
  handleScroll();
  visibilityHandler = () => {
    if (!document.hidden) render();
    else cancelAnimationFrame(animationFrame);
  };
  document.addEventListener("visibilitychange", visibilityHandler);
  render();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  resizeObserver?.disconnect();
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
  window.removeEventListener("pointermove", handlePointer);
  document.removeEventListener("visibilitychange", visibilityHandler);
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((value) => value.dispose());
  renderer?.dispose();
  scene?.clear();
});
</script>

<template>
  <canvas ref="canvas" class="residence-scene__canvas" aria-hidden="true" />
</template>
