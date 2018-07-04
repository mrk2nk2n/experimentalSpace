define([''], function () {
	
	// defining variables
	var videoSetting = {
		width: 320,
		height: 240
	},
		videoElement = null,
		canvasElement = null,
		canvasContext = null,
		videoDeviceElement = null,
		timer = !1;
		
	this.unSupport = void 0,
	this.devices = [];

    function listCamera() {
		return new Promise(function (t, n) {
			navigator.mediaDevices.enumerateDevices().then(function (e) {
				console.log(e), e.find(function (e) {
					if ("videoinput" === e.kind) {
						console.log(e);
						var t = {};
						t.name = e.label || "camera", t.deviceId = e.deviceId, devices.push(t)
                    }
                }), 0 === devices.length ? n("√ª”–…„œÒÕ∑") : (canvasElement = document.createElement("canvas"),
                    canvasContext = canvasElement.getContext("2d"),
                    console.log("ran listCamera() in arCameraBehaviour"),
                    t(devices))
			}).catch(function (e) {
				n(e)
			})
        })
	}

	function openCamera(e, t, n) {
        videoElement = e,
            n && (videoSetting = n);

		var r = {
			audio: !1,
			video: {
				deviceId: {
					exact: t
				}
			}
		};
        return canvasElement.setAttribute("width", videoSetting.width + "px"), canvasElement.setAttribute("height", videoSetting.height + "px"), videoElement.srcObject && videoElement.srcObject.getTracks().forEach(function (e) {
			e.stop()
		}), new Promise(function (t, n) {
			navigator.mediaDevices.getUserMedia(r).then(function (e) {
                videoElement.srcObject = e, videoElement.style.display = "block", videoElement.play(), t(!0)
			}).catch(function (e) {
				n(e)
			})
		})
	}

	function captureVideo() {
        return canvasContext.drawImage(videoElement, 0, 0, videoSetting.width, videoSetting.height), canvasElement.toDataURL("image/jpeg", .5).split("base64,")[1]
	}

	function debug() {
		console.log('debugging inside webarjs via function call');
	}

	return {
		debug: debug,
        listCamera: listCamera,
        openCamera: openCamera,
        captureVideo: captureVideo
	}
});
