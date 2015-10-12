var ObstacleObj = function(){
	this.speed = 0;
	this.isActive = false;
	this.progress = 0;
	this.sprite = null;
};

ObstacleObj.prototype.update = function(dt){
	try{
		this.progress = this.progress + (dt*this.speed);
	}
	catch(e){
		console.log(e);
	}
	if(progress >= 1){
		this.isActive = false;
		this.progress = 0;
	}
};

module.exports = ObstacleObj;

