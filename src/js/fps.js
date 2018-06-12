/**************************************************/
/* exo déplacement FPS                            */
/**************************************************/
console.log('exo FPS');


// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';


let camera, scene, renderer, geometry, material, mesh;
let fpsObject, pitchObject, yawObject;


const keys = [];
document.onkeydown = function (e) {
    e = e || window.event;
    keys[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e || window.event;
    keys[e.keyCode] = false;
};


const init = () => {
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.rotation.set(0, 0, 0);

    // mouse orientation
    fpsObject = new THREE.Object3D();
    scene.add(fpsObject);

    // rotation x
    pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    // rotation y
    yawObject = new THREE.Object3D();
    yawObject.position.y = 5;
    yawObject.add(pitchObject);
    scene.add(yawObject);

    document.addEventListener('mousemove', function (event) {
        const movementX = event.movementX;
        const movementY = event.movementY;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x));
    }, false);


    // cubes floor
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 30; y++) {
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshBasicMaterial({
                color: Math.floor(Math.random() * 16777215)
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x -= x * 2;
            mesh.position.z -= y * 2;
            mesh.position.y = -2;

            scene.add(mesh);
        }
    }

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);


    // pointer lock
    const pointerlockchange = function (event) {};
    const pointerlockerror = function (event) {};

    // hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);
    const element = document.body;

    element.addEventListener('click', function () {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }, false);
}

const clock = new THREE.Clock();

const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    const speed = 10;
    let dirZ = 0;
    let dirX = 0;

    // up
    if (keys[38]) {
        yawObject.translateZ(-delta * speed);
    }
    // down
    if (keys[40]) {
        yawObject.translateZ(delta * speed);
    }
    // left
    if (keys[37]) {
        yawObject.translateX(-delta * speed);
    }
    // right
    if (keys[39]) {
        yawObject.translateX(delta * speed);
    }

    renderer.render(scene, camera);
}

init();
animate();