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
    propertiesA = {speed:0.25};
    propertiesB = {speed:0.50};

    expT[0] = "0,1,"; 
    expT[1] = "0.25,0,";
    expT[2] = "0.625,0.375,0.75,0.5,";
    expT[3] = "0,0.75,0,0.25,";
    
})
 
describe('Model', function () {
    //T0
    it('should allow consumers to add Obstacle Types', function()
        {
            ccObstacles.addObstacleType(typeA,propertiesA);
            ccObstacles.addObstacleType(typeB,propertiesB);
            Helper.reset();
            ccObstacles.typesList.applyToEveryNode(Helper.getType);
            expect(expT[0]).equal(Helper.output);
        }
    );
    //T1
    it('should allow consumers to move time forward', function()
        {
            var obstacleListA = ccObstacles.typesList.head.obj.obstacleList;
            var obstacleListB = ccObstacles.typesList.head.next.obj.obstacleList;
            obstacleListA.enterObstacle();
            ccObstacles.update(1);
            // console.log(obstacleListA);
            Helper.reset();
            obstacleListA.applyToEveryNode(Helper.getProgress);
            obstacleListB.applyToEveryNode(Helper.getProgress);
            expect(expT[1]).equal(Helper.output);
            
            Helper.reset();
            obstacleListA.enterObstacle();
            obstacleListB.enterObstacle();
            ccObstacles.update(0.50);
            obstacleListB.enterObstacle();
            ccObstacles.update(1);
            obstacleListA.applyToEveryNode(Helper.getProgress);
            obstacleListB.applyToEveryNode(Helper.getProgress);
            expect(expT[2]).equal(Helper.output);
            ccObstacles.update(1);
            obstacleListB.enterObstacle();

            Helper.reset();
            ccObstacles.update(0.5);
            obstacleListA.applyToEveryNode(Helper.getProgress);
            obstacleListB.applyToEveryNode(Helper.getProgress);
            expect(expT[3]).equal(Helper.output);
        }
    );
});
