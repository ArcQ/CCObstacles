var ObstacleObj = require('./ObstacleObj.js');

var ObstacleList = function(){
	this.lastActiveNode = null;
	this.currentUpdateNode = null;
	this.properties = {};
}

ObstacleList.prototype = new window.dLinkedList();

ObstacleList.prototype.init = function(){
	var firstNode = this.addObstacleNode();
};

ObstacleList.prototype.enterObstacle = function(){
	
	var nextNode;
	if(this.lastActiveNode.obj.properties.isActive === false){
		this.lastActiveNode.obj.properties.isActive = true;
		return this.lastActiveNode;
	}
	else{

			if((this.lastActiveNode == null)||(this.lastActiveNode === this.tail)){
				nextNode = this.head;
			}
			else{
				nextNode = this.lastActiveNode.next;
			}
			
			var enterObstacleNode = null;

			if(nextNode!==null){
				var nextObstacle = nextNode.obj;
				if(nextObstacle.active === true){
					enterObstacleNode = this.addObstacleNode();
				}
				else{
					enterObstacleNode = nextObstacle;
				}	
			}
			else{
				enterObstacleNode = this.addObstacleNode();
			}

			enterObstacleNode.obj.properties.isActive = true;
			this.lastActiveNode = enterObstacleNode;

			return enterObstacleNode.obj;

	}

	
};

ObstacleList.prototype.addObstacleNode = function(){
	var obstacle = new ObstacleObj;
	obstacle.properties.speed = this.properties.speed;
	obstacle.properties.sprite = this.properties.sprite;

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
	var isFirstIteration = false;
	var updateObstacle = function(currentNode){
		
		if(isFirstIteration === true){
			//if back at the begining of the list, end
			if(currentNode == startNode){
				return false;
			}
		}

		var obstacle = currentNode.obj;
		if(obstacle.properties.isActive === true){
			obstacle.update(dt);
		}
		isFirstIteration = true;
		return obstacle.properties.isActive;
	}

	this.iterateOnceThrough(updateObstacle,false,startNode,true);
};

module.exports = ObstacleList;