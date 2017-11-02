
var renderer = PIXI.autoDetectRenderer(512, 512, {
	antialias: false,
	transparent: false,
	resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

