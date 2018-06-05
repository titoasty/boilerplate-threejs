/*************************************************************/
/* exo 1 : faire tourner le cube avec les flêches du clavier */
/*************************************************************/
console.log('exo 1');


// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';

// dat.gui
import dat from 'dat.gui';

let camera, scene, renderer, geometry, material, mesh;

var switchCamera = function () {
    if (camera && camera instanceof THREE.OrthographicCamera) {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.x = 3;
        camera.position.y = 8;
        camera.position.z = 10;
        camera.lookAt(new THREE.Vector3());
    } else {
        const r = 100;
        camera = new THREE.OrthographicCamera(window.innerWidth / -r, window.innerWidth / r, window.innerHeight / r, window.innerHeight / -r, -200, 500);
        camera.position.x = 3;
        camera.position.y = 8;
        camera.position.z = 10;
        camera.lookAt(new THREE.Vector3());
    }
};

const init = () => {
    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 0,5, 0);
    scene.add(directionalLight);

    for(let x=0; x<20; x++) {
        for(let y=0; y<20; y++) {
            var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: 0xff0000 }));
            mesh.position.x = x * 2 - 20;
            mesh.position.z = -y * 2 + 12;
            scene.add(mesh);
        }
    }

    switchCamera();
    switchCamera();
/*
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 10;
    camera.lookAt(new THREE.Vector3());

    const r = 100;
    camera = new THREE.OrthographicCamera(window.innerWidth / -r, window.innerWidth / r, window.innerHeight / r, window.innerHeight / -r, -200, 500);
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 10;
    camera.lookAt(new THREE.Vector3());
*/
    /*
    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    */

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // dat.gui
    // const gui = new dat.GUI();
    // gui.add(mesh.rotation, 'x', 0, Math.PI * 2).name('rotation x').step(0.01).listen();
    // gui.add(mesh.rotation, 'y', 0, Math.PI * 2).name('rotation y').step(0.01).listen();
}

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

init();
animate();

document.onkeydown = function (e) {
    e = e || window.event;

    switch (e.keyCode) {
        case 32:
            switchCamera();
            break;
        // left
        case 37:
            mesh.rotation.y -= 0.02;
            return;
            // right
        case 39:
            mesh.rotation.y += 0.02;
            return;
            // top
        case 38:
            mesh.rotation.x -= 0.02;
            return;
            // down
        case 40:
            mesh.rotation.x += 0.02;
            return;
    }
};