    let bindjQuery = function() {
        let jQueryScript = document.createElement('script');
        jQueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js');
        document.head.appendChild(jQueryScript);
        console.log("jQuery bound onto HTML head");
    };


    // n.default is a method to set a a default setting when a module is called
    // for example, n.default = c where the function under   c can also be directly called without defining a default
    // defining a function under a variable to be called later on

    let pageControl = {
        // checking for compatibility
        isAndroid: function() {
            return /android/i.test(navigator.userAgent.toLowerCase());
        },
        isIphone: function() {
            return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent.toLowerCase())
        },
        isWeChat: function() {
            return /MicroMessenger/i.test(navigator.userAgent.toLowerCase())
        },
        isSafari: function() {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        },
        iosVersion: function() {
            return navigator.userAgent.toLowerCase().match(/os\s+(\d+)/i) || !1
        },
        isWindows: function() {
            return /IEMobile/i.test(navigator.userAgent)
        },
        winHeight: function() {
            return window.innerHeight
        },

        // variables
        deviceId: [],

        // referencing pages / boxes
        bodyElement: $("#body"),
        threeContainer: $('#threecontainer'),
        pStartAR: $(".pStartAR"),
        pScanning: $(".pScanning"),
        posterBox: $(".posterBox"),
        pIntro: $(".pIntro"),
        pDisplay: $(".pDisplay"),
        pLoadContent: $(".pLoadContent"),
        bgShade: $(".bgShade"),

        // referencing buttons
        bStartAR: $("#bStartAR"),
        bReady: $(".bReady"),
        bMore: $(".bMore"),
        bBack: $(".bBack"),

        // other references
        myvideo: $("#myvideo"),
        video: $("#video")[0],
        bgAudioMp3: $("#bg-audio-mp3"),
        supportVideo: !0,
        // onPlaying: this.onPlaying.bind(this),

        // =================================== function
        // main control of all buttons and page flow
        eventController: function () {
            // make sure this refere to pageControl
            var ken = this;

            // set callback function on click of buttons
            // bStartAR
            this.bStartAR.on("click", function () {
                if (ken.pStartAR.hide(), ken.supportVideo) {
                //    ken.myvideo[0].play();
                    ken.openCamera();
                    // ken.pScanning.show();
                    ken.bgShade.show();
                    ken.pLoadContent.show();
                    initModel();
                    render();
                }
                else {
                    ken.pDisplay.show();
                    $("#video").hide();
                    var e = .16 * window.innerHeight,
                        t = .6 * window.innerHeight;
                    // initThree.getVideo().show(e, t),
                    ken.initScan();
                }
            });

            //  bReady
            this.bReady.on("click", function () {
                let e = $(".scanBody").offset().top,
                    t = $(".scanBody").height();
                ken.initScan();

                window.setTimeout(function () {
                    ken.posterBox.hide()
                    // ken.myvideo[0].play(),
                    // initThree.setupEnvironment();
                    // initThree.init3Dmodel();
                    $("#threecontainer").show();
                }, 1000);

                window.setTimeout(function () {
                    ken.bMore.show()
                }, 5000);
                
            });

            // bMore
            this.bMore.on("click", function () {
                console.log("bMore clicked");
                // $("#threecontainer").hide();
                // ken.pDisplay.hide();
                // ken.pIntro.show();

                window.open("http://www.magicast.cn/");
            })

        },

        onContentLoaded: function() {
            console.log("3D model loaded");
            this.bgShade.hide();
            this.pLoadContent.hide();
            this.pScanning.show();
        },

        // pre-loading assets
        loadController: function() {
            // declaring variables needed in this function
            let pLoading = $("#pLoading"),
            progress = $("#progress"),
            contentBox = $(".contentBox"),
            introPicUrl = "../img/1.jpg",
            demoVideoUrl = "";

            // insert HTML and SRC of video and intro according to chosen chapters
            this.setIntroInfo();

            // initialising preloadjs
            let queue = new createjs.LoadQueue(!1);
            queue.installPlugin(createjs.Sound);

            // update page based on createjs progress/completion
            queue.on("progress", function () {
                let percentage = Math.floor(100 * queue.progress);
                $("div", progress).css("width", percentage + "%");
                document.getElementById("openLoadingPercent").innerHTML = percentage + "%";
            }, this);
            queue.on("complete", function () {
                setTimeout(function () {
                    pLoading.hide();
                    contentBox.show();
                }, 200)
            }, this);

            queue.loadManifest([
                { src: "img/openanim-landscape2.jpg" },
                { src: "img/btn_ar.png" },
                { src: "img/btn_back.png" },
                { src: "img/btn_more.png" },
                { src: "img/r2d2.jpg" },
                { src: "img/scan.gif" },
                { src: "img/scan.gif" },
                { src: "img/text.png" }
            ]);
        },

        // insert HTML and SRC of video and intro content according to chosen chapters
        setIntroInfo: function  () {
            console.log("setting intro info");
        },

        // initialising camera
        checkCamera: function() {
            // declare 'this' accurately to the object that invoked checkCamera
            // i.e. pageControl
            let ken = this,
                j = this;
            // calling listCamera function from the initAR object
            // and recieve the output from the promise as 'e'
            initAR.listCamera().then(function (e) {
                console.log(e);
                j.isAndroid() ? j.deviceId = e[e.length - 1].deviceId : j.isIphone() && (j.deviceId = e[0].deviceId);
                console.log(j.deviceId);
            }).catch(function (e) {
                ken.failHandler();
            })
        },
        openCamera: function() {
            console.log(this.deviceId);
            let ken = this;
            initAR.openCamera(this.video, this.deviceId).then(function (e) {
                ken.video.setAttribute("height", window.innerHeight.toString() + "px")
            }).catch(function (e) {
                alert("打开视频设备失败")
            })
        },

        // handling operation inside Safari browser
        checkSafari: function () {
            this.isIphone() && this.isWeChat() ? $(".ioswxPanel").show() : $(".ioswxPanel").hide();
            this.isSafari() && this.isIphone() ? this.handleSafariBrowser() : console.log("this is not safari browser");
        },
        handleSafariBrowser: function() {
            console.log(this.iosVersion());
            document.getElementById("scanTip").style.top = "2%";
            document.getElementById("scanTop").style.height = "8%";
            document.getElementById("scanBody").style.top = "8%";
            document.getElementById("bReady").style.top = "66%";
            document.getElementById("posterPic").style.top = "8%";
            document.getElementById("bMore").style.top = "66%";
            // document.ontouchmove = function (event) {
            //     event.preventDefault();
            // }
        },

        // other helper functions
        initScan: function () {
            this.bMore.hide(),
            this.pScanning.hide(),
            this.posterBox.show(),
            this.pDisplay.show(),
            $("html").removeClass("introPage"),
            // this.myvideo[0].removeEventListener("playing", this.onVideoPlaying),
            this.pDisplay.css("background", "none"),
            console.log("started lf app!")
        },
        onPlaying: function () {
            this.myvideo[0].pause()
        },
        failHandler: function () {
            // this.iosVersion().length === 2 && (this.iosVersion() = this.iosVersion()[1] === 11),
            this.isIphone() ? $(".ioswxPanel").show() : this.supportVideo = !1;
        },
        onResize: function () {
            console.log("window height = " + window.innerHeight);
            this.video.style.height = window.innerHeight + "px";
        },
        getWindowSize: function () {
            var l = $(window).height(),
                j = $(window).width(),
                h = $(window).outerHeight();
            alert("windowHeight: " + l + " windowWidth: " + j + " windowOuterHeight " + h);
        },
        checkCompatibility: function() {
            console.log(this.isAndroid());
            console.log(this.iosVersion());
            console.log(this.isSafari());
            console.log(this.winHeight());
        }

    }; // end of pageControl
    // =====================

    // =====================
    // object that initialises use of device camera
    // functions are mostly called within pageControl
    let initAR = {
        // variables
        interval: 1e3,
        videoSettings: {
            width: 320,
            height: 240
        },
        videoElement: null,
        canvasElement: null,
        canvasContext: null,
        timer: null,
        unSupport: void 0,
        devices: [],
        recognizeUrl: "",

        // debug window here
        // functions
        listCamera: function () {
            // making sure using 'this' refers to the
            // variables defined within initAR, which invokes listCamera
            var r = this;
            // if this.devices is empty, 'this' has been used accurately
            console.log(r.devices)
            // use promise callback to list media devices and
            // pick those with videoinputs
            return new Promise (function (t, n) {
                navigator.mediaDevices.enumerateDevices().then(function(e){
                    console.log(e),
                    e.find(function(device){
                        if ("videoinput" === device.kind) {
                            var videoDevices = {};
                            videoDevices.name = device.label || "camera",
                            videoDevices.deviceId = device.deviceId,
                            r.devices.push(videoDevices)
                        }
                    }),
                    r.devices.length === 0 ? n("获取摄像头失败") : (canvasElement = document.createElement("canvas"),
                    canvasContext = canvasElement.getContext("2d"),
                    console.log(r.devices),
                    t(r.devices))
                }).catch(function (e) {
                    n(e)
                })
            })
        },
        openCamera: function (l, a, m) {
            let video = l,
                v = this.videoSettings;
                // important to redefine videoSettings to be
                //the variable defined within initAR
            m && (v = m);

            var deviceSettings = {
                audio: !1,
                video: {
                    deviceId: {
                        exact: a
                    }
                }
            };
            return canvasElement.setAttribute("width", v.width + "px"),
                canvasElement.setAttribute("height", v.height + "px"),
                video.srcObject && video.srcObject.getTracks().forEach(function (e) {
                    e.stop()
                }),
                new Promise(function(t, n) {
                    navigator.mediaDevices.getUserMedia(deviceSettings).then(function (e) {
                        video.srcObject = e,
                        video.style.display = "block",
                        video.play(),
                        t(!0)
                    }).catch(function (e) {
                        n(e)
                    })
                })
        }

    }; // end of initAR
    // =================================================================
    // =================================================================
    // =================================================================

    // =================================================================
    // =================================================================
    // =================================================================
    // initialize the threeJS environment
    let initThree = {
        setupEnvironment: function() {
            console.log("initialising threeJS environment");
            console.log("creating camera, scene");
            console.log("initialising 3D model");
        },

        init3Dmodel: function() {
            console.log("uploading 3D model");
            console.log("adding 3D model to scene");
            console.log("initialising device controls");
            console.log("initialising touch interaction");
        }
    }; // end of initThree
    // =====================


    // You can put all the example code in a separate file or just add it here for simplicity.
// The detector will show a warning if the current browser does not support WebGL.
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

// All of these variables will be needed later, just ignore them for now.
    var container;
    var camera, controls, scene, renderer;
    var clock = new THREE.Clock();
    var mixers = [];

    // initModel();
    // render();

    function initModel() {
        container = document.getElementById('threecontainer');
        document.body.appendChild(container);
        // Code...

        scene = new THREE.Scene();

        /////////////
        // add camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 300;
        scene.add(camera);

        //////////////
        // add light
        ambient = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambient);

        ///////////////////////
        // create a point light
        const pointLight =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);


        ////////////
        // add model
        // loadOBJmodel();
        loadFBXmodel();

        ///////////////
        // add renderer
        renderer = new THREE.WebGLRenderer({
            antialias: !1,
            alpha: !0,
            premultipliedAlpha: !0

        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight * 1.0);
        renderer.setClearColor(0,0);

        container.appendChild(renderer.domElement);

        /////////////////////////////////////////////////////////
        // add controls
        initOrbitControls();
    }
    /////////////////////////////////////////////////////////////////////
    //////////////////////////
    function render() {
        // Code...
        requestAnimationFrame(render);

        if ( mixers.length > 0 ) {
            for ( var i = 0; i < mixers.length; i ++ ) {
                mixers[ i ].update(clock.getDelta() );
            }
        }
        controls.update();
        renderer.render(scene, camera);
    }

    function loadOBJmodel() {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setBaseUrl('assets/');
        mtlLoader.setPath('assets/');
        mtlLoader.load('r2-d2.mtl', function (materials) {

            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('assets/');
            objLoader.load(
                'r2-d2.obj',
                function (object) {
                    scene.add(object);
                    object.position.y -= 60;
                },
                // called when loading is in progress
                function (e) {
                    var f = Math.floor(e.loaded / e.total * 100);
                    document.getElementById("loadingPercent").innerHTML = f + "%";
                    console.log( f + '% loaded' );
                    if (e.loaded === e.total) {
                        pageControl.onContentLoaded();
                    }
                },
                function (error) {
                    console.log("an error happened: " + error);
                }
            );

        });
    }

    function loadFBXmodel() {
        // model
        var fbxLoader = new THREE.FBXLoader();
        fbxLoader.load(
            'assets/fbx/Samba Dancing.fbx',
            // 'https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx',
            function ( object ) {
                object.mixer = new THREE.AnimationMixer( object );
                mixers.push( object.mixer );

                var action = object.mixer.clipAction( object.animations[ 0 ] );
                action.play();

                object.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        child.castShadow = false;
                        child.receiveShadow = false;
                    }

                } );
                object.position.y -= 60;
                scene.add( object );
            },

            // called when loading is in progress
            function (e) {
                var f = Math.floor(e.loaded / e.total * 100);
                document.getElementById("loadingPercent").innerHTML = f + "%";
                console.log( f + '% loaded' );
                if (e.loaded === e.total) {
                    pageControl.onContentLoaded();
                }
            },
            function (error) {
                console.log("an error happened: " + error);
            }
        )
    }

    function initOrbitControls() {
        // controls = new THREE.OrbitControls( camera );
        // controls.target.set( 0, 100, 0 );
        // controls.update();

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
    }

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////



/*pageControl.checkCompatibility();*/
pageControl.loadController();
pageControl.checkCamera();
pageControl.checkSafari();
pageControl.eventController();
