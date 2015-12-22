var Helper = {
	output:""
}

Helper.reset = function(){
	Helper.output="";
}

Helper.getType = function(currentTypeObj){
  Helper.output = Helper.output+currentTypeObj.type +",";

};

Helper.getProgress = function(currentNode,speed,time){
	// console.log("Trace: getProgress");

	// console.log(currentNode.obj);
  Helper.output = Helper.output+currentNode.obj.properties.progress +",";
};

module.exports = Helper;