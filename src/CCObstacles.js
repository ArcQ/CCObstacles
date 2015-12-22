var ObstacleObj = require('./ObstacleObj');
var ObstacleType = require('./ObstacleType');

var ccObstacles = function(){
	this.typesArr = [];
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

			this.typesArr[this.typesArr.length] = obstacleType;
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
	for(var i = 0; i< this.typesArr.length; i++){
		this.typesArr[i].update(dt);
	}
}					

ccObstacles.prototype.setObstacleProperties = function(obstacle,optProperties){
	obstacle.properties.speed = ((optProperties.speed == null) ? obstacle.properties.speed: optProperties.speed);
	obstacle.properties.progress = ((optProperties.progress == null) ? obstacle.properties.progress : optProperties.progress);
	obstacle.properties.sprite = ((optProperties.sprite == null) ? obstacle.properties.sprite : optProperties.sprite);
	obstacle.properties.isActive = (obstacle.progress <= 0);
};

ccObstacles.prototype.findObstacleType = function(type){
	var currentTypeObj;
	for(var i = 0; i< this.typesArr.length; i++){
		currentTypeObj = this.typesArr[i];
		if(currentTypeObj.type === type){
			return currentTypeObj;
		}
	}
	return undefined;
};

ccObstacles.prototype.applyToEveryType = function(callback){
	for(var i = 0; i< this.typesArr.length; i++){
		var otNode = this.typesArr[i];
		callback(otNode);
	}
}

window.ccObstacles = ccObstacles;
module.exports = ccObstacles;

