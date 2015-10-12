var ObstacleList = require('./ObstacleList')

var ObstacleType = function(){
	this.speed = 0;
	this.sprite = null;
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
		isActive = obstacle.isActive;
	}
}

module.exports = ObstacleType;
