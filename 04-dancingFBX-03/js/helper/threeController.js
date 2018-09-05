define(['threejs','detector','orbitControls','objLoader','mtlLoader'], function (tjs, dect, OC, objL, mtlL) {

    // You can put all the example code in a separate file or just add it here for simplicity.
// The detector will show a warning if the current browser does not support WebGL.
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

// All of these variables will be needed later, just ignore them for now.
    var container;
    var camera, controls, scene, renderer;

    // init();
    // render();

    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        // Code...

        /////////////////////////////////////////////////////////
        // add camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 300;

        /////////////////////////////////////////////////////////
        // add scene
        scene = new THREE.Scene();
        ambient = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambient);

        /////////////////////////////////////////////////////////
        // create a point light
        const pointLight =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);


        /////////////////////////////////////////////////////////
        // add model
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl('assets/');
        mtlLoader.setPath('assets/');
        mtlLoader.load('r2-d2.mtl', function (materials) {

            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('assets/');
            objLoader.load('r2-d2.obj', function (object) {

                scene.add(object);
                object.position.y -= 60;

            });

        });

        /////////////////////////////////////////////////////////
        // add renderer
        renderer = new THREE.WebGLRenderer({
            antialias: !1,
            alpha: !0,
            premultipliedAlpha: !0

        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0,0);

        container.appendChild(renderer.domElement);

        /////////////////////////////////////////////////////////
        // add controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
    }

    function render() {
        // Code...
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }

    return {
        init: init,
        render: render
    }

});
