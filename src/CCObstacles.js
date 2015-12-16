var ObstacleObj = require('./ObstacleObj');
var ObstacleType = require('./ObstacleType');

var ccObstacles = function(){
	this.typesList = new window.dLinkedList();
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.addObstacleType = function(type,properties){
	//only do something is type hasn't already been added
	if(this.findObstacleType(type)===undefined){
			if(properties==undefined){
				properties = {};
			}
			var obstacleType = new ObstacleType(properties);
			obstacleType.type = type;

			this.typesList.push(obstacleType);
	}
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.changeObstacleTypeProperties = function(type,properties){

	var obstacleType = this.findObstacleType(type);
	if(properties !=null){
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

	if(arguments[1] != null){
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
	obstacle.properties.speed = ((optProperties.speed == null) ? obstacle.properties.speed: optProperties.speed);
	obstacle.properties.progress = ((optProperties.progress == null) ? obstacle.properties.progress : optProperties.progress);
	obstacle.properties.sprite = ((optProperties.sprite == null) ? obstacle.properties.sprite : optProperties.sprite);
	obstacle.properties.isActive = (obstacle.progress <= 0);
};

ccObstacles.prototype.findObstacleType = function(type){
	var currentNode = this.typesList.head;
	while(currentNode != null){
		if(currentNode.obj.type === type){
			return currentNode.obj;
		}
		currentNode = currentNode.next;
	}
	return undefined;
};

window.ccObstacles = ccObstacles;
module.exports = ccObstacles;

