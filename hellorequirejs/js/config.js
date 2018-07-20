requirejs.config({
    baseUrl: 'js',
    deps: ['index'],
    paths: {
        // external libraries
        jquery: [
            'libs/jquery-3.3.1.min'
        ],
        threejs: [
            'libs/three.min'
        ],
        adapterjs: [
            'libs/adapter.min'
        ],
        createjs: [
            'libs/createjs.min'
        ],
        initAR: 'helper/initAR'
    }
});