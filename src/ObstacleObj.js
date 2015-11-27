var ObstacleProperties = require('./ObstacleProperties');

var ObstacleObj = function(){
	this.properties = new ObstacleProperties();
};

ObstacleObj.prototype.update = function(dt){
	try{
		this.properties.progress = this.properties.progress + (dt*this.properties.speed);
	}
	catch(e){
		console.log(e);
	}
	if(progress >= 1){
		this.properties.isActive = false;
		this.properties.progress = 0;
	}
};

module.exports = ObstacleObj;

