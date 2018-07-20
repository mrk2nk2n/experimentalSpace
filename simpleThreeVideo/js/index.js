
// step 3
// the WebGL renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true // ensures edges of objects to be smooth, not jagged
    // alpha: true // removes canvas bg color
    // https://threejs.org/docs/api/renderers/WebGLRenderer.html
});
// make scene renderer the size of the screen
renderer.setSize(window.innerWidth, window.innerHeight);

// step 4
// attach it to the DOM
// in the form of a canvas element
// does not have to be document.body, anywhere is fine
document.body.appendChild( renderer.domElement );

// step 1
// create a scene
var scene = new THREE.Scene();

// step 5a
// creating an object
// aim to be under 1-2Mb and Collada file
// var dae, // graphic
//     loader = new THREE.ColladaLoader(); // loader
// // create function to display the phone and then, load it
// function loadCollada( collada ) {
//     dae = collada.scene;
//     scene.add(dae);
// }
// loader.load( 'resources/iPhone+6/model.dae', loadCollada);

// step 5b
// creating a cube
var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// setting its animation
cube.rotation.y = Math.PI * 45 / 180; // calculated in Radians
// add cube into the scene
scene.add(cube);

// step 2 create a camera (fov, aspect, near, far)
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(cube.position);
scene.add(camera);

// step 6 create the render loop (60fps)
function renderPhone() {
    // requestAnimationFrame( renderPhone );
    renderer.render(scene, camera);
}
renderPhone();