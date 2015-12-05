(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//LinkedList for objects
//Many methods are based on the assumption that objects will consist of specific ids
var dLinkedList = function(){
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
	else{
		if(this.tail !== null){
			this.tail.next = newNode;
			newNode.prev = this.tail;
		}
		else{
			this.head.next = newNode;
			newNode.prev = this.head;
		}
		this.tail = newNode;
	}
	return newNode;
}

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

//iterate takes 3-4 arguments
//1. callback (required), returns true if you want to continue (return true to apply to all nodes)
//2. isForward: true for forwards iteration(required) or false backwards iteration
//3. starting node
//4. arg: optional, if you need to plug arguments into callback
dLinkedList.prototype.iterate = function(){
		var callback = arguments[0];
		var isForward = arguments[1];
		var arg = null;
		if(arguments[3] !== null){
			arg = arguments[3];
		}

    var currentNode = arguments[2];
    callback(currentNode);

    if(isForward){
    	currentNode = currentNode.next;
    }
    else{
    	currentNode = currentNode.prev;
    }

    while(currentNode != null){
    		var isContinue;

    		if(arg !== null){
					isContinue = callback(currentNode,arg);
    		}
    		else{
					isContinue = callback(currentNode);
    		}

        if(isContinue !== true){
        	break;
        }

        if(isForward){
        	currentNode = currentNode.next;
        }
        else{
        	currentNode = currentNode.prev;
        }
    }
};

//applyToEveryNode takes 1-2 arguments
//1. callback (required), returns true if you want to continue (return true to apply to all nodes)
//2. arg: optional, if you need to plug arguments into callback

dLinkedList.prototype.applyToEveryNode = function(){
	var callback = arguments[0];
	var arg = arguments[1];

	if(arg === null){
		var wrapper = function(currentNode){
			callback(currentNode);
			return true;
		}
		this.iterate(wrapper,true,this.head);
	}
	else{
		var wrapper = function(currentNode,cbArg){
			callback(currentNode,cbArg);
			return true;
		}
		this.iterate(wrapper,true,this.head,arg);
	}

}

window.dLinkedList = dLinkedList;

module.exports = dLinkedList;

},{}]},{},[1])


//# sourceMappingURL=src/maps/DLinkedList.js.map
