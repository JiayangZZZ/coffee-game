
var renderer = PIXI.autoDetectRenderer(600, 500, {
	antialias: false,
	transparent: true,
	resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

//varables
var caffeine = 0;
var metaRate = 9;
var energy = 120;

//PIXI containers
var stage = new PIXI.Container();

//loader
PIXI.loader
	.add('dying', '/images/1.png')
	.add('angry', '/images/2.png')
	.add('dancing', '/images/3.png')
	.add('good', '/images/4.png')
	.add('zombie', '/images/5.png')
	.add('shot', '/images/shot.png')
	.add('water', '/images/water.png')
	.load(setup);

var hero,
	buttonShot,
	buttonWater;

function setup() {
	stage.interactive = true;

	hero = new PIXI.Sprite(
		PIXI.loader.resources['good'].texture
	);

	buttonShot = new PIXI.Sprite(
		PIXI.loader.resources['shot'].texture
	);
	buttonWater = new PIXI.Sprite(
		PIXI.loader.resources['water'].texture
	);

	hero.x = 200;
	hero.scale.set(0.55, 0.55);

	buttonShot.scale.set(0.4, 0.4);
	// buttonShot.anchor.set(0.5, 0.5);
	buttonWater.scale.set(0.38, 0.38);
	// buttonWater.anchor.set(0.5, 0.5);
	buttonWater.y = renderer.height - buttonWater.height;
	console.log(hero.width)

	buttonShot.click = function() {
		caffeine += 77;
		energy = caffeine;
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
	stage.addChild(buttonShot);
	stage.addChild(buttonWater);
	stage.addChild(hero);

	animationLoop();
}

//animation
function animationLoop() {
	requestAnimationFrame(animationLoop);


	renderer.render(stage);
}

//set timer
function setTime() {
	var timer = document.getElementById('timer').innerHTML;
	var ampm = document.getElementById('ampm').innerHTML;
	var rate = document.getElementById('metaRate').innerHTML;
	var caffeine = document.getElementById('caffeine').innerHTML;

	var h = parseInt(timer);
	caffeine = parseInt(caffeine);
	rate = parseInt(rate);

	//varable changes
	h++;
	energy -= 10;

	//DOM changes
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

	if(energy <= 0) {
		hero.texture = PIXI.loader.resources['dying'].texture;
	}
	else if(energy < 90) {
		hero.texture = PIXI.loader.resources['zombie'].texture;
	}
	else if(energy < 200) {
		hero.texture = PIXI.loader.resources['good'].texture
	}
	else if(energy < 300) {
		hero.texture = PIXI.loader.resources['dancing'].texture
	}
	else {
		hero.texture = PIXI.loader.resources['angry'].texture
	}
}

setInterval(function() {
	setTime();
}, 1000)