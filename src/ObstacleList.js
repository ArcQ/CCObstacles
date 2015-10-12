var ObstacleObj = require('./ObstacleObj.js');

var ObstacleList = new window.dLinkedList();

ObstacleList.prototype.lastEnteredNode = null;
ObstacleList.prototype.currentUpdateNode = null;

ObstacleList.prototype.init = function(){
	var firstNode = this.addObstacle();
	this.lastEnterNode = firstNode;
};

ObstacleList.prototype.enterObstacle = function(){
	var nextNode = this.obstacleList.lastEnterNode.next;
	var nextObstacle = nextNode.obj;
	var enterObstacleNode = null;
	if(nextObstacle.active === true){
		enterObstacleNode = this.addObstacleNode();
		this.obstacleList.lastEnterNode = enterObstacleNode;
	}
	else{
		enterObstacleNode = nextObstacle;
		this.obstacleList.lastEnterNode = enterObstacleNode
	}
	return this.obstacleList.lastEnterNode.obj;
};

ObstacleList.prototype.addObstacleNode = function(){
	var obstacle = new ObstacleObj;
	for(var i = 0; i < arguments.length; i++){
		obstacle.speed = this.speed;
		obstacle.sprite = this.sprite;
	}
	var node = this.obstacleList.push(obstacle);
	this.obstacleList.lastEnterNode = node;
	return node;
};

ObstacleList.prototype.resetUpdateNode = function(){
	this.currentUpdateNode = this.lastEnterNode;
};

ObstacleList.prototype.getUpdateObstacle = function(){
	var obstacle = this.currentUpdateNode.obj;
	this.currentUpdateNode = this.currentUpdateNode.prev;
	return obstacle;
};

module.exports = ObstacleList;