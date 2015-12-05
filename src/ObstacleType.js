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
