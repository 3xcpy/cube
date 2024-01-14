import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 1, 16, 100);
const material = new THREE.MeshLambertMaterial({ color: 0xffd700 });
const torus = new THREE.Mesh(geometry, material);

const torus2 = new THREE.Mesh(geometry, material);
torus2.rotation.x = 1.5;

const torus3 = new THREE.Mesh(geometry, material);

scene.add(torus);
scene.add(torus2);
scene.add(torus3);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const cubeTexture = new THREE.TextureLoader().load('media/face.png');

const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cubeTexture }));

scene.add(cube);

cube.position.x = 0;
cube.position.y = 0;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  //moon.rotation.x += 0.05;
  //moon.rotation.y += 0.075;
  //moon.rotation.z += 0.05;

  //jeff.rotation.y += 0.01;
  //jeff.rotation.z += 0.01;

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    torus2.rotation.x += 0.01;
    torus2.rotation.y += 0.01;
    torus2.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    //camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

    

      //moon.rotation.x += 0.005;

  //controls.update();

  renderer.render(scene, camera);
}

animate();