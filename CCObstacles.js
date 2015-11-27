(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ObstacleObj = require('./ObstacleObj');
var ObstacleType = require('./ObstacleType');

var ccObstacles = function(){
	this.typesList = new window.dLinkedList();
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.addObstacleType = function(type,properties){
	console.log("Trace: addObstacleType()");
	//only do something is type hasn't already been added
	if(this.findObstacleType(type)===undefined){
			if((properties===undefined)||(properties ===null)){
				properties = {};
			}
			var obstacleType = new ObstacleType();
			obstacleType.type = type;

			this.typesList.push(obstacleType);
	//set optional properties
	this.setObstacleProperties(obstacleType,properties);
	}
};

//properties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.changeObstacleTypeProperties = function(type,properties){

	var obstacleType = this.findObstacleType(type);
	if((properties===undefined)||(properties ===null)){
		properties = {};
	}
	//set optional properties
		this.setObstacleProperties(obstacleType,properties);
};

//enterObstacle takes variable arguments (1-2) of 1.type 2.optProperties
//optProperties is an object containing optional obstacle properties such as speed...
ccObstacles.prototype.enterObstacle = function(){

	var type = arguments[0];
	console.log(this.typesList);
	var obstacleType = this.findObstacleType(type);
	console.log(this.typesList);
	var obstacle = obstacleType.enterObstacle();

	if(arguments[1] !== null){
		this.setObstacleProperties(obstacle,arguments[1]);
	}
	
};

ccObstacles.prototype.update = function(dt){
	var otNode = this.typesList.head;
	otNode.obj.update;
	while(otNode != this.typesList.head){
		otNode = otNode.next;
		otNode.obj.update(dt);
	}
}					

ccObstacles.prototype.setObstacleProperties = function(obstacle,optProperties){
	console.log("Trace: setObstacleProperties()");

	obstacle.properties.speed = ((optProperties.speed === null) ? obstacle.properties.speed: optProperties.speed);
	obstacle.properties.progress = ((optProperties.progress === null) ? obstacle.properties.progress : optProperties.progress);
	obstacle.properties.sprite = ((optProperties.sprite === null) ? obstacle.properties.sprite : optProperties.sprite);
	obstacle.properties.isActive = (obstacle.progress <= 0);
};

ccObstacles.prototype.findObstacleType = function(type){
	var currentNode = this.typesList.head;
	while(currentNode !== null){
		console.log(currentNode.obj.type);
		if(currentNode.obj.type === type){
			return currentNode.obj;
		}
		currentNode = currentNode.next;
	}
	return undefined;
};

window.ccObstacles = ccObstacles;
module.exports = ccObstacles;


},{"./ObstacleObj":3,"./ObstacleType":5}],2:[function(require,module,exports){
var ObstacleObj = require('./ObstacleObj.js');

var ObstacleList = function(){
	this.lastActiveNode = null;
	this.currentUpdateNode = null;

}

ObstacleList.prototype = new window.dLinkedList();

ObstacleList.prototype.init = function(){
	var firstNode = this.addObstacleNode();
	this.lastActiveNode = firstNode;

};

ObstacleList.prototype.enterObstacle = function(){
	var nextNode = this.lastActiveNode.next;
	if(nextNode===null){

	}
	else{
		var nextObstacle = nextNode.obj;
		var enterObstacleNode = null;

		if(nextObstacle.active === true){
			enterObstacleNode = this.addObstacleNode();
			this.lastActiveNode = enterObstacleNode;
		}
		else{
			enterObstacleNode = nextObstacle;
			this.lastActiveNode = enterObstacleNode
		}
		return this.lastActiveNode.obj;
	}
};

ObstacleList.prototype.addObstacleNode = function(){

	var obstacle = new ObstacleObj;
	
	for(var i = 0; i < arguments.length; i++){
		obstacle.speed = this.speed;
		obstacle.sprite = this.sprite;
	}

	var node = this.insertAfter(this.lastActiveNode,obstacle);

	this.lastActiveNode = node;
	
	return node;
};

ObstacleList.prototype.resetUpdateNode = function(){
	this.currentUpdateNode = this.lastActiveNode;
};

ObstacleList.prototype.getUpdateObstacle = function(){
	var obstacle = this.currentUpdateNode.obj;
	this.currentUpdateNode = this.currentUpdateNode.prev;
	return obstacle;
};

module.exports = ObstacleList;
},{"./ObstacleObj.js":3}],3:[function(require,module,exports){
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


},{"./ObstacleProperties":4}],4:[function(require,module,exports){
var ObstacleProperties = function(){
	this.speed = 0;
	this.sprite = null;
	this.progress = 0;
	this.isActive = false;
};

module.exports = ObstacleProperties;

},{}],5:[function(require,module,exports){
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

},{"./ObstacleList":2,"./ObstacleProperties":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ0NPYnN0YWNsZXMiLCJzcmMvT2JzdGFjbGVMaXN0LmpzIiwic3JjL09ic3RhY2xlT2JqLmpzIiwic3JjL09ic3RhY2xlUHJvcGVydGllcy5qcyIsInNyYy9PYnN0YWNsZVR5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBPYnN0YWNsZU9iaiA9IHJlcXVpcmUoJy4vT2JzdGFjbGVPYmonKTtcbnZhciBPYnN0YWNsZVR5cGUgPSByZXF1aXJlKCcuL09ic3RhY2xlVHlwZScpO1xuXG52YXIgY2NPYnN0YWNsZXMgPSBmdW5jdGlvbigpe1xuXHR0aGlzLnR5cGVzTGlzdCA9IG5ldyB3aW5kb3cuZExpbmtlZExpc3QoKTtcbn07XG5cbi8vcHJvcGVydGllcyBpcyBhbiBvYmplY3QgY29udGFpbmluZyBvcHRpb25hbCBvYnN0YWNsZSBwcm9wZXJ0aWVzIHN1Y2ggYXMgc3BlZWQuLi5cbmNjT2JzdGFjbGVzLnByb3RvdHlwZS5hZGRPYnN0YWNsZVR5cGUgPSBmdW5jdGlvbih0eXBlLHByb3BlcnRpZXMpe1xuXHRjb25zb2xlLmxvZyhcIlRyYWNlOiBhZGRPYnN0YWNsZVR5cGUoKVwiKTtcblx0Ly9vbmx5IGRvIHNvbWV0aGluZyBpcyB0eXBlIGhhc24ndCBhbHJlYWR5IGJlZW4gYWRkZWRcblx0aWYodGhpcy5maW5kT2JzdGFjbGVUeXBlKHR5cGUpPT09dW5kZWZpbmVkKXtcblx0XHRcdGlmKChwcm9wZXJ0aWVzPT09dW5kZWZpbmVkKXx8KHByb3BlcnRpZXMgPT09bnVsbCkpe1xuXHRcdFx0XHRwcm9wZXJ0aWVzID0ge307XG5cdFx0XHR9XG5cdFx0XHR2YXIgb2JzdGFjbGVUeXBlID0gbmV3IE9ic3RhY2xlVHlwZSgpO1xuXHRcdFx0b2JzdGFjbGVUeXBlLnR5cGUgPSB0eXBlO1xuXG5cdFx0XHR0aGlzLnR5cGVzTGlzdC5wdXNoKG9ic3RhY2xlVHlwZSk7XG5cdC8vc2V0IG9wdGlvbmFsIHByb3BlcnRpZXNcblx0dGhpcy5zZXRPYnN0YWNsZVByb3BlcnRpZXMob2JzdGFjbGVUeXBlLHByb3BlcnRpZXMpO1xuXHR9XG59O1xuXG4vL3Byb3BlcnRpZXMgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgb3B0aW9uYWwgb2JzdGFjbGUgcHJvcGVydGllcyBzdWNoIGFzIHNwZWVkLi4uXG5jY09ic3RhY2xlcy5wcm90b3R5cGUuY2hhbmdlT2JzdGFjbGVUeXBlUHJvcGVydGllcyA9IGZ1bmN0aW9uKHR5cGUscHJvcGVydGllcyl7XG5cblx0dmFyIG9ic3RhY2xlVHlwZSA9IHRoaXMuZmluZE9ic3RhY2xlVHlwZSh0eXBlKTtcblx0aWYoKHByb3BlcnRpZXM9PT11bmRlZmluZWQpfHwocHJvcGVydGllcyA9PT1udWxsKSl7XG5cdFx0cHJvcGVydGllcyA9IHt9O1xuXHR9XG5cdC8vc2V0IG9wdGlvbmFsIHByb3BlcnRpZXNcblx0XHR0aGlzLnNldE9ic3RhY2xlUHJvcGVydGllcyhvYnN0YWNsZVR5cGUscHJvcGVydGllcyk7XG59O1xuXG4vL2VudGVyT2JzdGFjbGUgdGFrZXMgdmFyaWFibGUgYXJndW1lbnRzICgxLTIpIG9mIDEudHlwZSAyLm9wdFByb3BlcnRpZXNcbi8vb3B0UHJvcGVydGllcyBpcyBhbiBvYmplY3QgY29udGFpbmluZyBvcHRpb25hbCBvYnN0YWNsZSBwcm9wZXJ0aWVzIHN1Y2ggYXMgc3BlZWQuLi5cbmNjT2JzdGFjbGVzLnByb3RvdHlwZS5lbnRlck9ic3RhY2xlID0gZnVuY3Rpb24oKXtcblxuXHR2YXIgdHlwZSA9IGFyZ3VtZW50c1swXTtcblx0Y29uc29sZS5sb2codGhpcy50eXBlc0xpc3QpO1xuXHR2YXIgb2JzdGFjbGVUeXBlID0gdGhpcy5maW5kT2JzdGFjbGVUeXBlKHR5cGUpO1xuXHRjb25zb2xlLmxvZyh0aGlzLnR5cGVzTGlzdCk7XG5cdHZhciBvYnN0YWNsZSA9IG9ic3RhY2xlVHlwZS5lbnRlck9ic3RhY2xlKCk7XG5cblx0aWYoYXJndW1lbnRzWzFdICE9PSBudWxsKXtcblx0XHR0aGlzLnNldE9ic3RhY2xlUHJvcGVydGllcyhvYnN0YWNsZSxhcmd1bWVudHNbMV0pO1xuXHR9XG5cdFxufTtcblxuY2NPYnN0YWNsZXMucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0KXtcblx0dmFyIG90Tm9kZSA9IHRoaXMudHlwZXNMaXN0LmhlYWQ7XG5cdG90Tm9kZS5vYmoudXBkYXRlO1xuXHR3aGlsZShvdE5vZGUgIT0gdGhpcy50eXBlc0xpc3QuaGVhZCl7XG5cdFx0b3ROb2RlID0gb3ROb2RlLm5leHQ7XG5cdFx0b3ROb2RlLm9iai51cGRhdGUoZHQpO1xuXHR9XG59XHRcdFx0XHRcdFxuXG5jY09ic3RhY2xlcy5wcm90b3R5cGUuc2V0T2JzdGFjbGVQcm9wZXJ0aWVzID0gZnVuY3Rpb24ob2JzdGFjbGUsb3B0UHJvcGVydGllcyl7XG5cdGNvbnNvbGUubG9nKFwiVHJhY2U6IHNldE9ic3RhY2xlUHJvcGVydGllcygpXCIpO1xuXG5cdG9ic3RhY2xlLnByb3BlcnRpZXMuc3BlZWQgPSAoKG9wdFByb3BlcnRpZXMuc3BlZWQgPT09IG51bGwpID8gb2JzdGFjbGUucHJvcGVydGllcy5zcGVlZDogb3B0UHJvcGVydGllcy5zcGVlZCk7XG5cdG9ic3RhY2xlLnByb3BlcnRpZXMucHJvZ3Jlc3MgPSAoKG9wdFByb3BlcnRpZXMucHJvZ3Jlc3MgPT09IG51bGwpID8gb2JzdGFjbGUucHJvcGVydGllcy5wcm9ncmVzcyA6IG9wdFByb3BlcnRpZXMucHJvZ3Jlc3MpO1xuXHRvYnN0YWNsZS5wcm9wZXJ0aWVzLnNwcml0ZSA9ICgob3B0UHJvcGVydGllcy5zcHJpdGUgPT09IG51bGwpID8gb2JzdGFjbGUucHJvcGVydGllcy5zcHJpdGUgOiBvcHRQcm9wZXJ0aWVzLnNwcml0ZSk7XG5cdG9ic3RhY2xlLnByb3BlcnRpZXMuaXNBY3RpdmUgPSAob2JzdGFjbGUucHJvZ3Jlc3MgPD0gMCk7XG59O1xuXG5jY09ic3RhY2xlcy5wcm90b3R5cGUuZmluZE9ic3RhY2xlVHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuXHR2YXIgY3VycmVudE5vZGUgPSB0aGlzLnR5cGVzTGlzdC5oZWFkO1xuXHR3aGlsZShjdXJyZW50Tm9kZSAhPT0gbnVsbCl7XG5cdFx0Y29uc29sZS5sb2coY3VycmVudE5vZGUub2JqLnR5cGUpO1xuXHRcdGlmKGN1cnJlbnROb2RlLm9iai50eXBlID09PSB0eXBlKXtcblx0XHRcdHJldHVybiBjdXJyZW50Tm9kZS5vYmo7XG5cdFx0fVxuXHRcdGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTtcblxud2luZG93LmNjT2JzdGFjbGVzID0gY2NPYnN0YWNsZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGNjT2JzdGFjbGVzO1xuXG4iLCJ2YXIgT2JzdGFjbGVPYmogPSByZXF1aXJlKCcuL09ic3RhY2xlT2JqLmpzJyk7XG5cbnZhciBPYnN0YWNsZUxpc3QgPSBmdW5jdGlvbigpe1xuXHR0aGlzLmxhc3RBY3RpdmVOb2RlID0gbnVsbDtcblx0dGhpcy5jdXJyZW50VXBkYXRlTm9kZSA9IG51bGw7XG5cbn1cblxuT2JzdGFjbGVMaXN0LnByb3RvdHlwZSA9IG5ldyB3aW5kb3cuZExpbmtlZExpc3QoKTtcblxuT2JzdGFjbGVMaXN0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcblx0dmFyIGZpcnN0Tm9kZSA9IHRoaXMuYWRkT2JzdGFjbGVOb2RlKCk7XG5cdHRoaXMubGFzdEFjdGl2ZU5vZGUgPSBmaXJzdE5vZGU7XG5cbn07XG5cbk9ic3RhY2xlTGlzdC5wcm90b3R5cGUuZW50ZXJPYnN0YWNsZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciBuZXh0Tm9kZSA9IHRoaXMubGFzdEFjdGl2ZU5vZGUubmV4dDtcblx0aWYobmV4dE5vZGU9PT1udWxsKXtcblxuXHR9XG5cdGVsc2V7XG5cdFx0dmFyIG5leHRPYnN0YWNsZSA9IG5leHROb2RlLm9iajtcblx0XHR2YXIgZW50ZXJPYnN0YWNsZU5vZGUgPSBudWxsO1xuXG5cdFx0aWYobmV4dE9ic3RhY2xlLmFjdGl2ZSA9PT0gdHJ1ZSl7XG5cdFx0XHRlbnRlck9ic3RhY2xlTm9kZSA9IHRoaXMuYWRkT2JzdGFjbGVOb2RlKCk7XG5cdFx0XHR0aGlzLmxhc3RBY3RpdmVOb2RlID0gZW50ZXJPYnN0YWNsZU5vZGU7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRlbnRlck9ic3RhY2xlTm9kZSA9IG5leHRPYnN0YWNsZTtcblx0XHRcdHRoaXMubGFzdEFjdGl2ZU5vZGUgPSBlbnRlck9ic3RhY2xlTm9kZVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5sYXN0QWN0aXZlTm9kZS5vYmo7XG5cdH1cbn07XG5cbk9ic3RhY2xlTGlzdC5wcm90b3R5cGUuYWRkT2JzdGFjbGVOb2RlID0gZnVuY3Rpb24oKXtcblxuXHR2YXIgb2JzdGFjbGUgPSBuZXcgT2JzdGFjbGVPYmo7XG5cdFxuXHRmb3IodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcblx0XHRvYnN0YWNsZS5zcGVlZCA9IHRoaXMuc3BlZWQ7XG5cdFx0b2JzdGFjbGUuc3ByaXRlID0gdGhpcy5zcHJpdGU7XG5cdH1cblxuXHR2YXIgbm9kZSA9IHRoaXMuaW5zZXJ0QWZ0ZXIodGhpcy5sYXN0QWN0aXZlTm9kZSxvYnN0YWNsZSk7XG5cblx0dGhpcy5sYXN0QWN0aXZlTm9kZSA9IG5vZGU7XG5cdFxuXHRyZXR1cm4gbm9kZTtcbn07XG5cbk9ic3RhY2xlTGlzdC5wcm90b3R5cGUucmVzZXRVcGRhdGVOb2RlID0gZnVuY3Rpb24oKXtcblx0dGhpcy5jdXJyZW50VXBkYXRlTm9kZSA9IHRoaXMubGFzdEFjdGl2ZU5vZGU7XG59O1xuXG5PYnN0YWNsZUxpc3QucHJvdG90eXBlLmdldFVwZGF0ZU9ic3RhY2xlID0gZnVuY3Rpb24oKXtcblx0dmFyIG9ic3RhY2xlID0gdGhpcy5jdXJyZW50VXBkYXRlTm9kZS5vYmo7XG5cdHRoaXMuY3VycmVudFVwZGF0ZU5vZGUgPSB0aGlzLmN1cnJlbnRVcGRhdGVOb2RlLnByZXY7XG5cdHJldHVybiBvYnN0YWNsZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JzdGFjbGVMaXN0OyIsInZhciBPYnN0YWNsZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuL09ic3RhY2xlUHJvcGVydGllcycpO1xuXG52YXIgT2JzdGFjbGVPYmogPSBmdW5jdGlvbigpe1xuXHR0aGlzLnByb3BlcnRpZXMgPSBuZXcgT2JzdGFjbGVQcm9wZXJ0aWVzKCk7XG59O1xuXG5PYnN0YWNsZU9iai5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZHQpe1xuXHR0cnl7XG5cdFx0dGhpcy5wcm9wZXJ0aWVzLnByb2dyZXNzID0gdGhpcy5wcm9wZXJ0aWVzLnByb2dyZXNzICsgKGR0KnRoaXMucHJvcGVydGllcy5zcGVlZCk7XG5cdH1cblx0Y2F0Y2goZSl7XG5cdFx0Y29uc29sZS5sb2coZSk7XG5cdH1cblx0aWYocHJvZ3Jlc3MgPj0gMSl7XG5cdFx0dGhpcy5wcm9wZXJ0aWVzLmlzQWN0aXZlID0gZmFsc2U7XG5cdFx0dGhpcy5wcm9wZXJ0aWVzLnByb2dyZXNzID0gMDtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZU9iajtcblxuIiwidmFyIE9ic3RhY2xlUHJvcGVydGllcyA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuc3BlZWQgPSAwO1xuXHR0aGlzLnNwcml0ZSA9IG51bGw7XG5cdHRoaXMucHJvZ3Jlc3MgPSAwO1xuXHR0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlUHJvcGVydGllcztcbiIsInZhciBPYnN0YWNsZUxpc3QgPSByZXF1aXJlKCcuL09ic3RhY2xlTGlzdCcpO1xudmFyIE9ic3RhY2xlUHJvcGVydGllcyA9IHJlcXVpcmUoJy4vT2JzdGFjbGVQcm9wZXJ0aWVzJyk7XG5cbnZhciBPYnN0YWNsZVR5cGUgPSBmdW5jdGlvbigpe1xuXHR0aGlzLnR5cGUgPSAtMTtcblx0dGhpcy5wcm9wZXJ0aWVzID0gbmV3IE9ic3RhY2xlUHJvcGVydGllcygpO1xuXHR0aGlzLm9ic3RhY2xlTGlzdCA9IG5ldyBPYnN0YWNsZUxpc3QoKTtcblx0dGhpcy5vYnN0YWNsZUxpc3QuaW5pdCgpO1xuXG5cbn07XG5cbk9ic3RhY2xlVHlwZS5wcm90b3R5cGUuZW50ZXJPYnN0YWNsZSA9IGZ1bmN0aW9uKCl7XG5cdC8vY2hlY2sgaWYgdGhlIG5vZGUgYWZ0ZXIgdGhlIGxhc3QgZW50ZXJlZCBub2RlIGlzIGFjdGl2ZSwgZWxzZSBhZGQgb25lXG5cdHZhciBvYnN0YWNsZSA9IHRoaXMub2JzdGFjbGVMaXN0LmVudGVyT2JzdGFjbGUoKTtcblx0cmV0dXJuIG9ic3RhY2xlO1xufTtcblxuT2JzdGFjbGVUeXBlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkdCl7XG5cdHRoaXMub2JzdGFjbGVMaXN0LnJlc2V0VXBkYXRlTm9kZSgpO1xuXHR2YXIgaXNBY3RpdmUgPSB0cnVlO1xuXHR3aGlsZShpc0FjdGl2ZSA9PT0gdHJ1ZSl7XG5cdFx0dmFyIG9ic3RhY2xlID0gdGhpcy5vYnN0YWNsZUxpc3QuZ2V0VXBkYXRlT2JzdGFjbGUoKTtcblx0XHRvYnN0YWNsZS51cGRhdGUoZHQpO1xuXHRcdGlzQWN0aXZlID0gb2JzdGFjbGUucHJvcGVydGllcy5pc0FjdGl2ZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYnN0YWNsZVR5cGU7XG4iXX0=
