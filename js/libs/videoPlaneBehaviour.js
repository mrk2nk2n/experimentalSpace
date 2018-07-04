define(['jquery', 'threejs',], function($, threejs) {

	this.width = 512,
	this.height = 201,
	this.scale = 368 / this.width,
	this.camera = e,
	this.scene = t,
	this.video = (0, a.default)("#myvideo")[0], // demo display video
	this.texture = new s.VideoTexture(this.video, s.UVMapping, s.ClampToEdgeWrapping, s.ClampToEdgeWrapping, s.LinearFilter, s.LinearFilter, s.RGBFormat, s.UnsignedByteType),
	this.material = new s.MeshBasicMaterial({
		map: this.texture,
		overdraw: .5
	}),
	this.plane = new s.PlaneGeometry(this.width, this.height, 4, 4),
	this.mesh = new s.Mesh(this.plane, this.material),
	this.mesh.scale.x = this.scale

	function show() {
		var n = height * (.5 * window.innerHeight - (e + .5 * t)) / t,
			r = -height * window.innerHeight / (2 * t * Math.tan(s.Math.degToRad(.5 * camera.fov)));

		mesh.position.set(0, n, r),
		camera.updateMatrixWorld(!0),
		camera.localToWorld(mesh.position),
		camera.getWorldQuaternion(mesh.quaternion),
		scene.add(mesh)
	}

	function hide() {
		scene.remove(mesh)
	}

	function debug() {
		console.log('debugging inside initCamDisp via function call');
	}

	return {
		debug: debug,
		show: show,
		hide: hide
	}

});