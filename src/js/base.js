// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';

let camera, scene, renderer, geometry, material, mesh;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mesh.rotation.x += 0.5 * delta;
    mesh.rotation.y += 0.7 * delta;

    renderer.render(scene, camera);
}

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

init();
animate();
