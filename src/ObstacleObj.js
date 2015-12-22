var ObstacleProperties = require('./ObstacleProperties');

var ObstacleObj = function(){
	this.properties = new ObstacleProperties();
	this.spriteCB = null;
};

ObstacleObj.prototype.update = function(dt){
 	try{
		this.properties.progress = this.properties.progress + (dt*this.properties.speed);
	}
	catch(e){
		console.log(e);
	}
	if(this.properties.progress >= 1){
		this.properties.isActive = false;
		this.properties.progress = 0;
	}
};

module.exports = ObstacleObj;

