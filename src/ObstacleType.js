var ObstacleList = require('./ObstacleList');
var ObstacleProperties = require('./ObstacleProperties');

var ObstacleType = function(properties){
	this.type = -1;
	this.properties = new ObstacleProperties();
	this.obstacleList = new ObstacleList(this.properties);
	this.setProperties(properties);
	this.obstacleList.init();
	this.spriteCB = function(sprite){
		return null;
	}
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
	this.properties.speed = ((properties.speed == null) ? this.properties.speed: properties.speed);
	this.properties.progress = ((properties.progress == null) ? this.properties.progress : properties.progress);
	this.properties.sprite = ((properties.sprite == null) ? this.properties.sprite : properties.sprite);
	this.obstacleList.properties = this.properties;
};

ObstacleType.prototype.setSpriteCallback = function(callback){
	this.spriteCB = callback;
	this.obstacleList.spriteCB = this.spriteCB;
}

module.exports = ObstacleType;
