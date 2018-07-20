// Get the DOM element to attach to
const container =
    document.querySelector('#container');
let canvas = $("#threeContainer")[0];

// Set the scene size.
const WIDTH = canvas.offsetWidth;
const HEIGHT = canvas.offsetHeight;

// calculating VIEW_ANGLE
let k = 50;
let t = 2 * Math.tan(THREE.Math.degToRad(k / 2)) / Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight);
let e = 2 * THREE.Math.radToDeg(Math.atan(t * canvas.offsetHeight / 2));
console.log("vieAngle = " + e); // 29.4332159

// Set some camera attributes.
const VIEW_ANGLE = e;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: !1,
    alpha: !0,
    premultipliedAlpha: !0
});
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
// camera.rotation.x = THREE.Math.degToRad(45);
const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
// renderer.setSize(WIDTH, HEIGHT);
// renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0,0);
renderer.setPixelRatio(window.devicePixelRatio);
console.log("devicePixelRatio = " + window.devicePixelRatio);
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, !1);

// Attach the renderer-supplied
// DOM element.
// container.appendChild(renderer.domElement);

//////////////////////// initialising sphere
////////////////////////
////////////////////////
// Set up the sphere vars
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;

// create the sphere's material
const sphereMaterial =
    new THREE.MeshLambertMaterial(
        {
            color: 0xCC0000
        });
// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),

    sphereMaterial);

// Move the Sphere back in Z so we
// can see it.
sphere.position.z = -300;

// Finally, add the sphere to the scene.
scene.add(sphere);

//////////////////////// initialising plane
////////////////////////
////////////////////////
const planeWidth = 512;
const planeHeight = 201;
const planeScale = 368 / planeWidth;

const demoVideo = $("#myvideo")[0];
const planeTexture = new THREE.VideoTexture(
    demoVideo,
    THREE.UVMapping,
    THREE.ClampToEdgeWrapping,
    THREE.ClampToEdgeWrapping,
    THREE.LinearFilter,
    THREE.LinearFilter,
    THREE.RGBFormat,
    THREE.UnsignedByteType
);

const planeMaterial = new THREE.MeshBasicMaterial({
   map: planeTexture,
   overdraw: .5
});

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(planeWidth, planeHeight, 4, 4),
    planeMaterial
);

//////////////////////// adjust plane settings
////////////////////////
////////////////////////
plane.scale.x = planeScale;
plane.position.z = -800;

const valE = .16 * window.innerHeight;
const valT = .6 * window.innerHeight;
const posY = planeHeight * (.5 * window.innerHeight - (valE + .5 * valT)) / valT;
const posZ = -planeHeight * window.innerHeight / (2 * valT * Math.tan(THREE.Math.degToRad(.5 * camera.fov)));
console.log(posY);
console.log(posZ);
plane.position.set(0, posY, posZ);
scene.add(plane);

//////////////////////// adjust camera to follow plane
////////////////////////
////////////////////////
camera.updateMatrixWorld(!0);
camera.localToWorld(plane.position);
camera.getWorldQuaternion(plane.quaternion);

//////////////////////// creating light
////////////////////////
////////////////////////
// create a point light
const pointLight =
    new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

////////////////////////
////////////////////////
////////////////////////
// Draw!
renderer.render(scene, camera);

function update () {
    // Draw!
    renderer.render(scene, camera);

    // Schedule the next frame.
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);

/////////////////////////
/////////////////////////
/////////////////////////
function handleClick() {
    console.log("clicked");
    console.log(demoVideo.paused);
    if (demoVideo.paused === true)
        demoVideo.play();
    else {
        demoVideo.pause();
        demoVideo.currentTime = 0;
    }
}
