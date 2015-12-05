var assert = require('assert'),
    expect = require('chai').expect,
    Helper = require('../0/Helper.js');

var expT,typeA,typeB,propertiesA,propertiesB;


process.env.NODE_ENV = 'test';

var ccObstacles = new window.ccObstacles();

before(function(){
    expT = [];
    typeA = 0;
    typeB = 1;
    typeC = 2;
    propertiesA = {speed:0.25};
    propertiesB = {speed:0.25};
    propertiesC = {speed:0.25};

    expT[0] = "0,1,2,"; 
    expT[1] = "1,2,3,4";      
    
})
 
describe('Model', function () {
    //T0
    it('should allow consumers to add Obstacle Types', function()
        {
            ccObstacles.addObstacleType(typeA,propertiesA);
            ccObstacles.addObstacleType(typeB,propertiesB);
            ccObstacles.addObstacleType(typeC,propertiesC);
            Helper.reset();
            ccObstacles.typesList.applyToEveryNode(Helper.getType);
            expect(expT[0]).equal(Helper.output);
        }
    );
    //T1
    it('should allow consumers to move time forward', function()
        {
            ccObstacles.update(0.5);
            var obstacleListA = ccObstacles.typesList.head.obj.obstacleList;
            var obstacleListB = ccObstacles.typesList.head.next.obj;
            // console.log(obstacleListA);
            Helper.reset();
            obstacleListA.applyToEveryNode(Helper.getProgress);
            expect(expT[0]).equal(Helper.output);
        }
    );
});
