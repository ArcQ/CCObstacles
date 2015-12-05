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