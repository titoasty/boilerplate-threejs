// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';

let camera, scene, renderer, geometry, material, mesh;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const clock = new THREE.Clock();

let myTween;
let myTweenBack;
let myTweenObj;

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

//    mesh.rotation.x += 0.5 * delta;
//    mesh.rotation.y += 0.7 * delta;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
        var obj = intersects[i].object;

        if (!myTween) {
            if(myTweenBack) {
                myTweenBack.kill();
                myTweenBack = null;
            }

            myTweenObj = obj;
            myTween = TweenLite.to(myTweenObj.rotation, 1, {
                y: Math.PI,
                ease: Expo.easeOut,
                onComplete: () => {
                    myTween = null;
                }
            });
        }
    }

    if (intersects.length <= 0) {
        if(myTween) {
            myTween.kill();
            myTween = null;
        }

        if(!myTweenBack && myTweenObj) {
            myTweenBack = TweenLite.to(myTweenObj.rotation, 1, {
                y: 0,
                ease: Expo.easeOut,
                onComplete: () => {
                    myTweenBack = null;
                }
            });
            myTweenObj = null;
        }
    }

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

init();
animate();