var ObstacleObj = require('./ObstacleObj.js');

var ObstacleList = function(){
	this.lastActiveNode = null;
	this.currentUpdateNode = null;

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
		obstacle.speed = this.speed;
		obstacle.sprite = this.sprite;
	}

	var node = this.insertAfter(this.lastActiveNode,obstacle);

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