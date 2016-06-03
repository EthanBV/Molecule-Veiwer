window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
var molecules = [];
var mouseDx = 0;
var mouseDy = 0;
var hudCanvas = document.getElementById('hudCanvas');
hudCanvas.width = window.innerWidth;
hudCanvas.height = window.innerHeight;
var ctx = hudCanvas.getContext("2d");
ctx.font = "20px Arial";
ctx.fillStyle = "GREEN";
var dx = 0;
var dz = 0;
var dy = 0;
var toggleCooldown = 20;
var toggleTimmer = 0;

function move(left, right, forward, back, up, down) {
    var vel = 0.02;
    var forwards = 0;
    var sideways = 0;
    var upwards = 0
    var angle = 0;
    if(left) sideways++;
    if(right) sideways--;
    if(forward) forwards--;
    if(back) forwards++;
    if(up) upwards++;
    if(down) upwards--;
    if(upwards != 0) {
        dy += upwards * vel;
    }
    if(sideways !== 0 || forwards !== 0) {
        angle = Math.atan2(forwards, sideways) - camera.rotation.y;
        dz -= Math.sin(angle) * vel;
        dx -= Math.cos(angle) * vel;
    }
}

function begingame() {
    // create a basic BJS Scene object
    //                 scene = new BABYLON.Scene(engine);
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    // target the camera to scene origin
    //     camera.setTarget(BABYLON.Vector3.Zero());
    // attach the camera to the canvas
    //     camera.attachControl(canvas, false);
    // create a basic light, aiming 0,1,0 - meaning, to the sky
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.7);
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.specular = new BABYLON.Color3(0, 0, 0);
    //     var xScale = BABYLON.Mesh.CreateBox("box", 0.01, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    //     xScale.scaling.x = 100;
    //     xScale.position.x += .5;
    //     var zScale = BABYLON.Mesh.CreateBox("box", 0.01, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    //     zScale.scaling.z = 100;
    //     zScale.position.z += 0.5;
    //     var yScale = BABYLON.Mesh.CreateBox("box", 0.01, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    //     yScale.scaling.y = 100;
    //     yScale.position.y += 0.5;
//     molecules.push(new Sucrose(0, 0, 20));
//     molecules.push(new BlankMolecule(0, 0, 5));
    molecules.push(new Capsaicin(0, 0, 10));
    // run the render loop
    engine.runRenderLoop(function() {
        if(keys[89]){
            alert(molecules[0]);
            keys[89] = false;
        }
        ctx.clearRect(0, 0, hudCanvas.width, hudCanvas.height)
        ctx.strokeStyle = "rgb(40,40,20)";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(hudCanvas.width / 2, hudCanvas.height / 2 + 10);
        ctx.lineTo(hudCanvas.width / 2, hudCanvas.height / 2 - 10);
        ctx.moveTo(hudCanvas.width / 2 + 10, hudCanvas.height / 2);
        ctx.lineTo(hudCanvas.width / 2 - 10, hudCanvas.height / 2);
        ctx.stroke();
        if(keys[84] && toggleTimmer == 0) {
            hydrogenMaterial.alpha = (hydrogenMaterial.alpha == 1 ? 0 : (hydrogenMaterial.alpha == 0 ? 0.2 : 1));
            carbonMaterial.alpha = (carbonMaterial.alpha == 1 ? 0 : (carbonMaterial.alpha == 0 ? 0.2 : 1));
            oxygenMaterial.alpha = (oxygenMaterial.alpha == 1 ? 0 : (oxygenMaterial.alpha == 0 ? 0.2 : 1));
            nitrogenMaterial.alpha = (nitrogenMaterial.alpha == 1 ? 0 : (nitrogenMaterial.alpha == 0 ? 0.2 : 1));
            toggleTimmer = toggleCooldown;
        }
        if(toggleTimmer > 0) toggleTimmer--;
        updateEditor();
        for(i = 0; i < molecules.length; i++) {
            molecules[i].update();
        }
        move(keys[65], keys[68], keys[87], keys[83], keys[81], keys[90]);
        camera.position.x += dx;
        camera.position.y += dy;
        camera.position.z += dz;
        if(mouseDx != 0) {
            camera.rotation.y += mouseDx / 1000;
            mouseDx = 0;
            if(camera.rotation.y > Math.PI) camera.rotation.y -= Math.PI * 2;
            if(camera.rotation.y < -Math.PI) camera.rotation.y += Math.PI * 2;
        }
        if(mouseDy != 0) {
            camera.rotation.x += mouseDy / 1000;
            mouseDy = 0;
            if(camera.rotation.x > Math.PI / 2 - 0.1) camera.rotation.x = Math.PI / 2 - 0.1;
            if(camera.rotation.x < -Math.PI / 2 + 0.1) camera.rotation.x = -Math.PI / 2 + 0.1;
        }
        var angle = Math.atan2(dz, dx);
        var vel = Math.sqrt(dz * dz + dx * dx);
        vel *= 0.85;
        dz = Math.sin(angle) * vel;
        dx = Math.cos(angle) * vel;
        dy *= 0.85;
        if(Math.abs(dx) < 0.01) dx = 0;
        if(Math.abs(dz) < 0.01) dz = 0;
        scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', function() {
        engine.resize();
    });
}
window.addEventListener('DOMContentLoaded', function() {
    begingame();
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    hudCanvas.onclick = function() {
        canvas.requestPointerLock();
    };
    document.addEventListener("mousemove", function(e) {
        mouseDx += e.movementX || e.mozMovementX || 0;
        mouseDy += e.movementY || e.mozMovementY || 0;
    });
});
var selectedObject = null;
var editorOpen = false;
window.addEventListener("click", function() {
    // We try to pick an object
    selectedAtom = null;
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    selectedObject = pickResult.pickedMesh;
    if(pickResult.pickedMesh != null) editorOpen = true;
    else editorOpen = false;
});
var keys = [];
var keyPress = [];
onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
};