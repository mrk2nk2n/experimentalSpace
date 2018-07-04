// JavaScript source code


requirejs.config({
    baseUrl: 'js',
    deps: ['main'],
    paths: {
        // external libaries
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min',
            //if the CDN location fails, load from this location
            'libs/jquery-3.3.1.min'
        ],
        threejs: [
            '//ajax.googleapis.com/ajax/libs/threejs/r84/three.min',
            //if the CDN location fails, load from this location
            'libs/three.min'
        ],
        createjs: [
            '//code.createjs.com/1.0.0/createjs.min',
            //if the CDN location fails, load from this location
            'libs/createjs.min'
        ],
        adapterjs: 'libs/adapter.min',

        // created libaries
        index: 'libs/index',
        arCam: 'libs/arCameraBehaviour',
        vidPlane: 'libs/videoPlaneBehaviour',
        pageController: 'libs/pageController',
        preloadController: 'libs/preloadController'
    }
});
