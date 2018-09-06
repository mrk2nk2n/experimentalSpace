// 列出设备上所有的摄像头

// 打开摄像头

// 把摄像机视频展示在页面的背景上




// 初始化ThreeJs基本场景
var scene = new THREE.Scene()

// Camera 相机
// ThreeJs里有两种相机：
// （A）透视相机 - 近大远小 （可设置可视角度、长宽比例、近深度剪切面、远深度剪切面）
// （B）正投影相机：远近一样大

var camera = new THREE.PerspectiveCamera(
    45, // 可视角度
    this.canvas.offsetWidth / this.canvas.offsetHeight, // 长宽比例
    0.1, // 近深度剪切面
    1000 // 远深度剪切面
)

// CanvasRenderer 渲染器
// (A).setClearColor() - 设置背景色
// (B).setSize - 渲染区域大小

var renderer = new THREE.WebGLRenderer({
    canvas: canvas, // 如果不规定，ThreeJs会自动在HTML上生成Canvas
    antialias: !1,
    alpha: !0,
    premultipliedAlpha: !0
}),

renderer.setClearColor(0, 0),
renderer.setPixelRatio(window.devicePixelRatio),

// size可根据预先设置好的Canvas或者根据窗口尺寸window.innerWidth, window.innerHeight
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, !1),
// renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, !1),  




// 指向已初始化的 <video> 元素

// 绑定AR视频素材

// 在JS文件里初始化ThreeJs VideoTexture，绑着该视频，然后继续通过MeshBasicMaterial绑定在ThreeJs 平面（plane）上：

// 当预先加载完成后，初始化3D场景：

// 设定全屏播放视频：






// 绑定3D场景里的相机到模型上






{
key: "loadFBXmodel",
value: function (modelName, x, y, z) {
    let ke = this;

    // 初始化
    this.fbxLoader = new THREE.FBXLoader();
    this.fbxLoader.load(
        'assets/fbx/' + modelName + '.fbx',
        function ( object ) {
            ke.modelObject = object;

            // 绑定模型动画，初始化AnimationMixer，指向模型
            object.mixer = new THREE.AnimationMixer( object );
            ke.mixers.push( object.mixer );
            var action = object.mixer.clipAction( object.animations[ 0 ] );
            action.play();

            ke.modelObject.position.set(x, y, z); // 设置模型位置
            ke.scene.add( object );
        },
        function (e) {
            // 显示加载模型进度
            var f = Math.floor(e.loaded / e.total * 100);
            $("div", $("#progress")).css("width", f + "%");
            document.getElementById("loadingPercent").innerHTML = f + "%";

            console.log( f + '% loaded' );
            if (e.loaded === e.total) {
                console.log("content all loaded");
                // 继续进行代码
            }
        },
        function (error) {
            console.log("an error happened: " + error);
        }
    )
}
}