//define(['adapterjs','index'], function(adapter,index) {
define(['adapterjs', 'preloadController', 'pageController'], function (adapter, preloadControl, pageControl) {

    preloadControl.preloader();

    pageControl.checkCamera();
    pageControl.bindEvent();

});


