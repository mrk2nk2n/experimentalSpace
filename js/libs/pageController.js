define(['jquery', 'arCam', 'createjs'], function ($, arCam, cjs) {


	// ============== handling start of camera ==================== //

	var e = navigator.userAgent.toLowerCase();
	this.isAndroid = /android/i.test(e),
	this.isIphone = /(iPhone|iPad|iPod|iOS)/i.test(e),
	this.isWeChat = /MicroMessenger/i.test(e),
	this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
	this.iosversion = e.match(/os\s+(\d+)/i) || !1,
	this.winHeight = window.innerHeight,
    this.bodyElement = $("#body"),
    this.startPanel = $(".openPanel"),
    this.scanPanel = $(".scan-panel"),
	this.btnOpenCamera = $("#openCamera"),
	this.video = $("#video")[0],
	this.deviceId,
    this.supportVideo = !0;

	function checkCamera() {	
		arCam.listCamera().then(function (e) { // call listcamera function from EasyAR module 4
			isAndroid ? deviceId = e[e.length - 1].deviceId : isIphone && (deviceId = e[0].deviceId) // choose camera accordingly when iPhone and Android
		}).catch(function (e) {
			fail()
		})
	}

	function bindEvent() {

		// pageStartAR button >> pageScanning
		btnOpenCamera.on("click", function () {
			if (startPanel.hide(), supportVideo) { // support video is default !0 true, unless set by "fail" function to be !1 false
				//n.myvideo[0].play(),
				openCamera(),
				scanPanel.show(),
				console.log("video supported, show ScanPanel");
			}
			else { // if camera feed not supported, bypass scanning page and display demo video directly
				//videoPanel.show(),
				$("#video").hide();
				var e = .16 * window.innerHeight,
					t = .6 * window.innerHeight;
				/*n.app.getVideo().show(e, t)*/ // returns the video material
				/*n.scan()*/ // show demo video display
				console.log(" camera feed not supported");
			}
		})

		// pageScanning button >> pageDisplay

		// end
	}

	function fail() {
		2 <= iosversion.length && (iosversion = 11 <= iosversion[1]),
		isIphone && isWeChat && iosversion ? $(".ioswxPanel").show() : supportVideo = !1
	}

	function openCamera() {
		console.log("deviceid: " + deviceId),
		arCam.openCamera(video, deviceId).then(function (e) {
			video.setAttribute("height", window.innerHeight.toString() + "px")
		}).catch(function (e) {
			alert("打开视频设备失败")
		})
	}

	// ================ handling safari ==================== //

	function checkSafari() {
		this.isSafari && this.isIphone ? this.resizeSafariBrowser() : console.log("this is not safari browser");
	}

	function resizeSafariBrowser() {

	}

	function getWindowSize() {
		var t = $(window).height(),
			n = $(window).width(),
			o = $(window).outerHeight();
		alert("windowHeight: " + t + " windowWidth: " + n + " windowOuterHeight " + o);
	}


	// ================= debugging functions ================ //

	function debug() {
		console.log(isIphone);
		console.log(isAndroid);
	}

	return {
		debug: debug,
		// handling camera
		checkCamera: checkCamera,
		bindEvent: bindEvent,
		fail: fail,
		openCamera: openCamera,
		// handling safari
		checkSafari: checkSafari,
		resizeSafariBrowser: resizeSafariBrowser,
		getWindowSize: getWindowSize
	}

});