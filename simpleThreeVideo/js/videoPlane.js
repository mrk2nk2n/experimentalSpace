
let canvas = $("#three_container")[0];
console.log(canvas.offsetWidth); // 980 galaxy S5
console.log(canvas.offsetHeight); // 552

let k = 50;
let t = 2 * Math.tan(THREE.Math.degToRad(k / 2)) / Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight);
let e = 2 * THREE.Math.radToDeg(Math.atan(t * canvas.offsetHeight / 2));
console.log(e); // 29.4332159

let camera = new THREE.PerspectiveCamera(e, canvas.offsetWidth / canvas.offsetHeight, .1, 1e4);
// camera.rotation.x = THREE.Math.degToRad(45);

let scene = new THREE.Scene;
scene.add(camera);

let renderer = new THREE.WebGLRenderer ({
    canvas: canvas,
    antialias: !1,
    alpha: !0,
    premultipliedAlpha: !0
});
renderer.setClearColor(0, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, !1);

// let controls = new deviceorientationcontrols.default(camera, renderer);
// controls.connect();

let planeWidth = 512;
let planeHeight = 201;
let planeScale = 368 / planeWidth;

let demoVideo = $("#myvideo")[0];
let texture = new THREE.VideoTexture(
    demoVideo,
    THREE.UVMapping,
    THREE.ClampToEdgeWrapping,
    THREE.ClampToEdgeWrapping,
    THREE.LinearFilter,
    THREE.LinearFilter,
    THREE.RGBFormat,
    THREE.UnsignedByteType
);

let material = new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: .5
});

let plane = new THREE.PlaneGeometry(planeWidth, planeHeight, 4, 4);
let mesh = new THREE.Mesh(plane, material);
mesh.scale.x = planeScale;

function show(eValue, tValue) {
    let xValue = planeHeight * (.5 * window.innerHeight - (eValue + .5 * tValue)) / tValue;
    let zValue = -planeHeight * window.innerHeight / (2 * tValue * Math.tan(THREE.Math.degToRad(.5 * camera.fov)));
    mesh.position.set(0, xValue, zValue);

    camera.updateMatrixWorld(!0);
    camera.localToWorld(mesh.position);
    camera.getWorldQuaternion(mesh.quaternion);

    scene.add(mesh);
}

function hide() {
    scene.remove(mesh);
}

let showHeight1 = .16 * window.innerHeight;
let showHeight2 = .6 * window.innerHeight;
show(showHeight1, showHeight2);