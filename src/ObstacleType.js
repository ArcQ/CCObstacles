var ObstacleList = require('./ObstacleList');
var ObstacleProperties = require('./ObstacleProperties');

var ObstacleType = function(){
	this.type = -1;
	this.properties = new ObstacleProperties();
	this.obstacleList = new ObstacleList();
	this.obstacleList.init();


};

ObstacleType.prototype.enterObstacle = function(){
	//check if the node after the last entered node is active, else add one
	var obstacle = this.obstacleList.enterObstacle();
	return obstacle;
};

ObstacleType.prototype.update = function(dt){
	this.obstacleList.resetUpdateNode();
	var isActive = true;
	while(isActive === true){
		var obstacle = this.obstacleList.getUpdateObstacle();
		obstacle.update(dt);
		isActive = obstacle.properties.isActive;
	}
};

module.exports = ObstacleType;
