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

