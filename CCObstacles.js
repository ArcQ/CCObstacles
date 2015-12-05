(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ObstacleObj = require('./ObstacleObj');
var ObstacleType = require('./ObstacleType');

var ccObstacles = function(){
	this.typesList = new window.dLinkedList();
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.addObstacleType = function(type,properties){
	//only do something is type hasn't already been added
	if(this.findObstacleType(type)===undefined){
			if((properties===undefined)||(properties ===null)){
				properties = {};
			}
			var obstacleType = new ObstacleType();
			obstacleType.type = type;

			this.typesList.push(obstacleType);
	//set optional properties
	this.setObstacleProperties(obstacleType,properties);
	}
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.changeObstacleTypeProperties = function(type,properties){

	var obstacleType = this.findObstacleType(type);
	if((properties===undefined)||(properties ===null)){
		properties = {};
	}
	//set optional properties
		this.setObstacleProperties(obstacleType,properties);
};

//enterObstacle takes variable arguments (1-2) of 1.type 2.optProperties
//optProperties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.enterObstacle = function(){

	var type = arguments[0];
	var obstacleType = this.findObstacleType(type);
	var obstacle = obstacleType.enterObstacle();

	if(arguments[1] !== null){
		this.setObstacleProperties(obstacle,arguments[1]);
	}
	
};

ccObstacles.prototype.update = function(dt){

	var updateThisType = function(otNode){
		otNode.obj.update(dt);
		return true;
	};

	this.typesList.applyToEveryNode(updateThisType);

}					

ccObstacles.prototype.setObstacleProperties = function(obstacle,optProperties){
	obstacle.properties.speed = ((optProperties.speed === null) ? obstacle.properties.speed: optProperties.speed);
	obstacle.properties.progress = ((optProperties.progress === null) ? obstacle.properties.progress : optProperties.progress);
	obstacle.properties.sprite = ((optProperties.sprite === null) ? obstacle.properties.sprite : optProperties.sprite);
	obstacle.properties.isActive = (obstacle.progress <= 0);
};

ccObstacles.prototype.findObstacleType = function(type){
	var currentNode = this.typesList.head;
	while(currentNode !== null){
		if(currentNode.obj.type === type){
			return currentNode.obj;
		}
		currentNode = currentNode.next;
	}
	return undefined;
};

window.ccObstacles = ccObstacles;
module.exports = ccObstacles;


},{"./ObstacleObj":3,"./ObstacleType":5}],2:[function(require,module,exports){
var ObstacleObj = require('./ObstacleObj.js');

var ObstacleList = function(typeProperties){
	this.lastActiveNode = null;
	this.currentUpdateNode = null;
	this.properties = typeProperties;
	this.init();
}

ObstacleList.prototype = new window.dLinkedList();

ObstacleList.prototype.init = function(){
	var firstNode = this.addObstacleNode();
	this.lastActiveNode = firstNode;
};

ObstacleList.prototype.enterObstacle = function(){
	var nextNode = this.lastActiveNode.next;
	if(nextNode===null){

	}
	else{
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
	}
};

ObstacleList.prototype.addObstacleNode = function(){
	var obstacle = new ObstacleObj;
	for(var i = 0; i < arguments.length; i++){
		obstacle.speed = this.properties.speed;
		obstacle.sprite = this.properties.sprite;
	}

	var node;
	
	if(this.lastActiveNode===null){
		node = this.push(obstacle)
	}
	else{
		node = this.insertAfter(this.lastActiveNode,obstacle);
	}

	this.lastActiveNode = node;
	
	return node;
};

ObstacleList.prototype.updateNodes = function(dt){
	var startNode = this.lastActiveNode;
	var updateObstacle = function(currentNode){
		console.log(dt);
		var obstacle = currentNode.obj;
		if(obstacle.properties.isActive === true){
			obstacle.update(dt);
		}
		return obstacle.properties.isActive;
	}

	this.iterate(updateObstacle,false,startNode);
};

module.exports = ObstacleList;
},{"./ObstacleObj.js":3}],3:[function(require,module,exports){
var ObstacleProperties = require('./ObstacleProperties');

var ObstacleObj = function(){
	this.properties = new ObstacleProperties();
};

ObstacleObj.prototype.update = function(dt){
	try{
		this.properties.progress = this.properties.progress + (dt*this.properties.speed);
	}
	catch(e){
		console.log(e);
	}
	if(this.properties.progress >= 1){
		this.properties.isActive = false;
		this.properties.progress = 0;
	}
};

module.exports = ObstacleObj;


},{"./ObstacleProperties":4}],4:[function(require,module,exports){
var ObstacleProperties = function(){
	this.speed = 0;
	this.sprite = null;
	this.progress = 0;
	this.isActive = false;
};

module.exports = ObstacleProperties;

},{}],5:[function(require,module,exports){
var ObstacleList = require('./ObstacleList');
var ObstacleProperties = require('./ObstacleProperties');

var ObstacleType = function(){
	this.type = -1;
	this.properties = new ObstacleProperties();
	console.log(this.properties.speed);
	this.obstacleList = new ObstacleList(this.properties);
};

ObstacleType.prototype.enterObstacle = function(){
	//check if the node after the last entered node is active, else add one
	var obstacle = this.obstacleList.enterObstacle();
	return obstacle;
};

ObstacleType.prototype.update = function(dt){	
	this.obstacleList.updateNodes(dt);
};

ObstacleType.prototype.setProperties = function(properties){
	this.properties.speed = ((properties.speed === null) ? this.properties.speed: properties.speed);
	this.properties.progress = ((properties.progress === null) ? this.properties.progress : properties.progress);
	this.properties.sprite = ((properties.sprite === null) ? this.properties.sprite : properties.sprite);
	this.obstacleList.properties = this.properties;
};

module.exports = ObstacleType;

},{"./ObstacleList":2,"./ObstacleProperties":4}]},{},[1])


//# sourceMappingURL=src/maps/CCObstacles.js.map
