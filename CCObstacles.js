(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ObstacleObj = require('./ObstacleObj');
var ObstacleType = require('./ObstacleType')

var ccObstacles = function(){
	this.typesArr = [];
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.addObstacleType = function(type,properties){
	
	var obstacleType = new ObstacleList();
	this.typesArr.push(obstacleType);
	
	//set optional properties
	obstacleType.speed = ((properties.speed === null) ? obstacle.speed: 0);
 	obstacleType.sprite = properties.sprite;
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.changeObstacleTypeProperties = function(type,properties){
	
	var obstacleType = this.typesArr.findFirst(type);
	
	//set optional properties
	obstacleType.speed = ((properties.speed === null) ? obstacle.speed: 0);
 	obstacleType.sprite = properties.sprite;
};

//enterObstacle takes variable arguments (1-2) of 1.type 2.optProperties
//optProperties is an object containing optional obstacle properties such as speed...

ccObstacles.prototype.enterObstacle = function(){
	
	var types = arguments[0];
	var obstacleType = this.typesArr[type];
	var obstacle = obstacleType.enterObstacle();

	if(arguments[1] !== null){
		this.setObstacleProperites(obstacle,arguments[1]);
	}
	
};

ccObstacles.prototype.update = function(dt){
	for(var i = 0; i < this.typesArr.length; i++){
		var obstacleType = this.typesArr[i];
		obstacleType.update(dt);
	}
}

ccObstacles.prototype.setObstacleProperites = function(obstacle,optProperties){
	obstacle.speed = ((optProperties.speed === null) ? obstacle.speed: optProperties.speed);
	obstacle.progress = ((optProperties.progress === null) ? obstacle.progress : optProperties.progress);
	obstacle.sprite = ((optProperties.sprite === null) ? obstacle.sprite : optProperties.sprite);
};

this.window = cc.Obstacles;
module.exports = ccObstacles;


},{"./ObstacleObj":3,"./ObstacleType":4}],2:[function(require,module,exports){
var ObstacleObj = require('./ObstacleObj.js');

var ObstacleList = function(){
	this.lastActiveNode = null;
	this.currentUpdateNode = null;
}

ObstacleList.prototype = new window.dLinkedList();

ObstacleList.prototype.init = function(){
	var firstNode = this.addObstacle();
	this.lastActiveNode = firstNode;
};

ObstacleList.prototype.enterObstacle = function(){
	var nextNode = this.lastActiveNode.next;
	var nextObstacle = nextNode.obj;
	var enterObstacleNode = null;
	if(nextObstacle.active === true){
		enterObstacleNode = this.addObstacleNode();
		this.lastActiveNode = enterObstacleNode;
	}
	else{
		enterObstacleNode = nextObstacle;
		this.lastActiveNode = enterObstacleNode
	}
	return this.lastActiveNode.obj;
};

ObstacleList.prototype.addObstacleNode = function(){
	var obstacle = new ObstacleObj;
	for(var i = 0; i < arguments.length; i++){
		obstacle.speed = this.speed;
		obstacle.sprite = this.sprite;
	}
	var node = this.push(obstacle);
	this.lastActiveNode = node;
	return node;
};

ObstacleList.prototype.resetUpdateNode = function(){
	this.currentUpdateNode = this.lastActiveNode;
};

ObstacleList.prototype.getUpdateObstacle = function(){
	var obstacle = this.currentUpdateNode.obj;
	this.currentUpdateNode = this.currentUpdateNode.prev;
	return obstacle;
};

module.exports = ObstacleList;
},{"./ObstacleObj.js":3}],3:[function(require,module,exports){
var ObstacleObj = function(){
	this.speed = 0;
	this.isActive = false;
	this.progress = 0;
	this.sprite = null;
};

ObstacleObj.prototype.update = function(dt){
	try{
		this.progress = this.progress + (dt*this.speed);
	}
	catch(e){
		console.log(e);
	}
	if(progress >= 1){
		this.isActive = false;
		this.progress = 0;
	}
};

module.exports = ObstacleObj;


},{}],4:[function(require,module,exports){
var ObstacleList = require('./ObstacleList')

var ObstacleType = function(){
	this.speed = 0;
	this.sprite = null;
	this.obstacleList = new ObstacleList();
	this.obstacleList.init();
};

ObstacleType.prototype.enterObstacle = function(){
	//check if the node after the last entered node is active, else add one
	var obstacle = this.obstacleList.enterObstacle();
	return obstacle;
};

ObstacleType.prototype.update = function(dt){
	this.obstacleList.resetUpdateNode();
	var isActive = true;
	while(isActive === true){
		var obstacle = this.obstacleList.getUpdateObstacle();
		obstacle.update(dt);
		isActive = obstacle.isActive;
	}
}

module.exports = ObstacleType;

},{"./ObstacleList":2}]},{},[1]);
