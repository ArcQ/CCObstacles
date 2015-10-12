//LinkedList for objects
//Many methods are based on the assumption that objects will consist of specific ids
window.dLinkedList = function(){
	this.head = null;
	this.tail = null;
};

dLinkedList.makeNode = function(obj){
	var node = {
		obj: obj,
		next: null,
		prev: null
	};

	return node;
};

dLinkedList.prototype.push = function(obj){
	var newNode = dLinkedList.makeNode(obj);

	if(this.head === null){
		this.head = newNode;
	}

	if(this.tail !== null){
		this.tail.next = newNode;
	}
	newNode.prev = this.tail;
	this.tail = newNode;
	return newNode;

};

dLinkedList.prototype.insertAfter = function(refNode,inObj){
	
	var newNode = dLinkedList.makeNode(inObj);

	if((this.tail === null)||(this.tail === refNode)){
		//only scenario this happens is if you only have one head node
		this.tail = newNode;
		newNode.prev = refNode;
		refNode.next = newNode;
	}
	else{
		var nextNode = refNode.next;

		//insert node inbetween
		refNode.next = newNode;
		newNode.prev = this.refNode;
		newNode.next = nextNode;
		nextNode.prev = newNode.next;
	}
	return newNode;
};

dLinkedList.prototype.insertBefore = function(refNode,inObj){
	var newNode = dLinkedList.makeNode(inObj);
	//if list only has one element
	if(this.tail === null){
		this.tail = refNode;
		refNode.prev = newNode;
		this.head = newNode;
	}
	else{
		var prevNode = refNode.prev;
		refNode.prev = newNode;
		newNode.next = refNode;
		//if refNode doesn't have a prev, it is the head of the list and the head needs to be changed
		if(prevNode === null){
			this.head = newNode;
		}
		else{
			prevNode.next = newNode;
			newNode.prev = prevNode;
		}
	}

	return newNode;
};
//finds the first node that has the obj
dLinkedList.prototype.findFirst = function(obj){
	var currentNode = this.head;
	while(currentNode !== null){
		if(currentNode.obj === obj){
			return currentNode;
		}
		currentNode = currentNode.next;
	}
	return undefined;
};

dLinkedList.prototype.remove = function(delNode){
	var prevNode = null;
	var currentNode = this.head;

	while(currentNode !== null){

		if(currentNode === delNode){

			if(currentNode === this.head){
				var nextNode = currentNode.next;
				this.head = nextNode;
				this.head.prev = null;
			}
			else if(currentNode === this.tail){
				this.tail = currentNode.prev;
				this.tail.next = null;
			}
			else{
				var nextNode = currentNode.next;
				prevNode.next = nextNode;
				nextNode.prev = prevNode;
			}
			currentNode = null;
			return true;
		}
		
		prevNode = currentNode;
		currentNode = currentNode.next;
	}

	return false;
};

module.exports = dLinkedList;
