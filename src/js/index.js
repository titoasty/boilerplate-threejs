// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

// dat.gui
import dat from 'dat.gui';

// create webgl renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
// resize it
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// add it to the dom
document.body.appendChild(renderer.domElement);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// scene
const scene = new THREE.Scene();

// simple cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000
});
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshLambertMaterial({
        color: 0xdddddd
    })
);
plane.castShadow = false;
plane.receiveShadow = true;
plane.position.y = -1;
plane.rotateX(-Math.PI / 2);
scene.add(plane);

camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

//const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 0;
directionalLight.shadow.camera.far = 5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);

scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

const controls = new THREE.OrbitControls(camera);

// simple light
//const light = new THREE.PointLight(0xFFFF00);
//light.position.set(10, 0, 25);
//scene.add(light);

// main loop
const clock = new THREE.Clock();
const render = function () {
    const delta = clock.getDelta();

    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    camera.updateProjectionMatrix();

    controls.update();

    renderer.render(scene, camera);
};
render();