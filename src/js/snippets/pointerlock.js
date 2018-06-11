// pointer lock
var pointerlockchange = function (event) {};
var pointerlockerror = function (event) {};

// hook pointer lock state change events
document.addEventListener('pointerlockchange', pointerlockchange, false);
document.addEventListener('pointerlockerror', pointerlockerror, false);
var element = document.body;

element.addEventListener('click', function () {
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    element.requestPointerLock();
}, false);
