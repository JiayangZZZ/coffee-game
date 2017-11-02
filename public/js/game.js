
var renderer = PIXI.autoDetectRenderer(800, 600, {
	antialias: false,
	transparent: false,
	resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
	.add('/images/1.png')
	.load(setup);

var hero;

function setup() {
	hero = new PIXI.Sprite(
		PIXI.loader.resources['/images/1.png'].texture
	);

	hero.scale.set(0.3, 0.3);

	stage.addChild(hero);
	renderer.render(stage);
}

function setTime() {
	var timer = document.getElementById('timer').innerHTML;
	var ampm = document.getElementById('ampm').innerHTML;

	var h = parseInt(timer);
	h++;
	document.getElementById('timer').innerHTML = "" + h + "";
	if(h > 12) {
		document.getElementById('timer').innerHTML = 1;
		if(ampm == 'AM') {
			document.getElementById('ampm').innerHTML = "PM";
		}
		else {
			document.getElementById('ampm').innerHTML = "AM";
		}
	}
}

setInterval(function() {
	setTime();
}, 1000)