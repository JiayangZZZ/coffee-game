
var renderer = PIXI.autoDetectRenderer(800, 600, {
	antialias: false,
	transparent: true,
	resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

//varables
var caffeine = 0;
var metaRate = 9;

//PIXI containers
var stage = new PIXI.Container();
var controller = new PIXI.Container();



PIXI.loader
	.add('dying', '/images/1.png')
	.add('shot', '/images/shot.png')
	.add('water', '/images/water.png')
	.load(setup);

var hero,
	buttonShot,
	buttonWater;

function setup() {
	controller.interactive = true;
	// hero = new PIXI.Sprite(
	// 	PIXI.loader.resources['dying'].texture
	// );

	// hero.scale.set(0.3, 0.3);

	buttonShot = new PIXI.Sprite(
		PIXI.loader.resources['shot'].texture
	);
	buttonWater = new PIXI.Sprite(
		PIXI.loader.resources['water'].texture
	);

	buttonShot.scale.set(0.4, 0.4);
	// buttonShot.anchor.set(0.5, 0.5);
	buttonWater.scale.set(0.4, 0.4);
	// buttonWater.anchor.set(0.5, 0.5);
	buttonWater.y = renderer.height - buttonWater.height;

	buttonShot.click = function() {
		caffeine += 77;
		document.getElementById('caffeine').innerHTML = caffeine;
	}
	buttonShot.mouseover = function() {
		buttonShot.width += 5;
		buttonShot.height += 5;
	}
	buttonShot.mouseout = function() {
		buttonShot.width -= 5;
		buttonShot.height -= 5;
	}

	buttonWater.click = function() {
		metaRate += 1;
		document.getElementById('metaRate').innerHTML = metaRate;
	}
	buttonWater.mouseover = function() {
		buttonWater.width += 5;
		buttonWater.height += 5;
	}
	buttonWater.mouseout = function() {
		buttonWater.width -= 5;
		buttonWater.height -= 5;
	}

	buttonShot.interactive = true;
	buttonShot.buttonMode = true;
	buttonWater.interactive = true;
	buttonWater.buttonMode = true;
	controller.addChild(buttonShot);
	controller.addChild(buttonWater);

	// stage.addChild(hero);
	animationLoop();
}

function animationLoop() {
	requestAnimationFrame(animationLoop);

	
	

	renderer.render(stage);
	renderer.render(controller);
}

function setTime() {
	var timer = document.getElementById('timer').innerHTML;
	var ampm = document.getElementById('ampm').innerHTML;
	var rate = document.getElementById('metaRate').innerHTML;
	var caffeine = document.getElementById('caffeine').innerHTML;

	var h = parseInt(timer);
	caffeine = parseInt(caffeine);
	rate = parseInt(rate);

	h++;
	document.getElementById('timer').innerHTML = "" + h + "";
	if(caffeine >= rate) {
		document.getElementById('caffeine').innerHTML = "" + (caffeine-rate) + "";
	}
	else {
		document.getElementById('caffeine').innerHTML = 0;
	}
	
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