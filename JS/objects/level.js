/**
 * Created by Adam Walker and Joshua Styles
 * Level Object
 * 
 * Changes
 * Added level generator (Addaption of code that was used before) v0.1
 * Added offsets to track piece positions to prevent gaps showing.v0.2
 * Added roof array and changed name of variable levelArray to groundArray for better representation. v0.3
 *
 * Bugs
 */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


var LevelPiece = function (x,y,imgRef,rotation) {
    //Anchor is set to the middle for rotation, important when it comes to having our actual graphics.
    this.offsetX = 32;
    this.offsetY = 16;


    //Set properties of the object
    this.x = x + this.offsetX;
    this.y = y + this.offsetY;

    this.imgRef = imgRef;
    this.rotation = rotation;

    //Set up Spite
    this.sprite = game.add.sprite(this.x,this.y,this.imgRef);

    //Set offset
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    //Rotate the sprite
    this.sprite.angle = this.rotation;

    //Enable physics for the sprite. Allows collision detection.
    game.physics.arcade.enable(this.sprite);

    //Remove gravity for this sprite.
    this.sprite.body.allowGravity = false;
    this.sprite.body.immovable = true;
    this.sprite.body.velocity.x = LEVELSPEEDX;
};

//Level strip object
var LevelStrip = function (x, y, isObstacle) {
    this.blocks = [];


    //Set Properties
    this.x = x;
    this.y = y;
    this.isObstacle = isObstacle;

    //Check to see if the strip is to be an obstacle
    if(this.isObstacle){
        this.generateObstacle();
    }else{
        //Create Non obstacle
        this.blocks[0] = new LevelPiece(this.x,this.y,"base",0);
        this.blocks[1] = new LevelPiece(this.x,gameHeight - 32,"base",180);
    }
};

//Generate an  obstacle strip.
LevelStrip.prototype.generateObstacle = function () {
    var rndBlocks = getRandomInt(8,12);
    var rndTopBlocks = getRandomInt(2,rndBlocks);

    var y = 0;

    this.blocks[0] = new LevelPiece(this.x,y,"base",0);
    y+=32;

    for(var i = 1;i<=rndTopBlocks;i++){
        this.blocks[i] = new LevelPiece(this.x,y,"normal",0);
        y+=32
    }

    y=gameHeight -32;

    this.blocks[this.blocks.length] = new LevelPiece(this.x,y,"base",180);
    y-=32;

    for(var j = rndTopBlocks;j<rndBlocks;j++){
        this.blocks[j] = new LevelPiece(this.x,y,"normal",180);
        y-=32
    }

};

//Update the level strip
LevelStrip.prototype.update = function () {
    this.y = this.blocks[0].sprite.body.y;
    this.x = this.blocks[0].sprite.body.x;
};

//Check the collision
LevelStrip.prototype.checkCollision = function (playerSprite,onCollide) {
    for (var i = 0; i <this.blocks.length; i++){
        console.log("Checking Collision");
        game.physics.arcade.collide(playerSprite, this.blocks[i].sprite, null, onCollide);
    }
};

var Level = function () {
    //properties
    this.TRACKPIECENUM = 15;
    this.levelStrips = [];
    this.levelStripsCounter = 4;
    this.offset = 1;

    //Variables for level
    this.startObstacals = 9;

    for(var i = 0; i<=this.TRACKPIECENUM;i++){
        if(i==this.startObstacals){
            this.levelStripsCounter = 4;
        }
        if(i >= this.startObstacals && this.levelStripsCounter == 4){
            this.levelStrips.push(new LevelStrip(i*(64 - this.offset),0,true)) ;
            this.levelStripsCounter = 0;
        }
        this.levelStrips.push(new LevelStrip(i*(64 - this.offset),0,false));
        this.levelStripsCounter ++;
    }
    this.levelDistance = 0;
};

Level.prototype.updateLevel = function () {
    for(var i = 0; i<this.levelStrips.length;i++){
        this.levelStrips[i].update()
    }
    if(this.levelStrips[0].x<= 0 - 64){
        console.log("Generate");
        this.levelStrips.splice(0,1);
        if(this.levelStripsCounter==4){
            this.levelStrips.push(new LevelStrip(this.levelStrips[this.levelStrips.length-1].x +(64 - this.offset),0,true));
            this.levelStripsCounter = 0;
        }else{
            this.levelStrips.push(new LevelStrip(this.levelStrips[this.levelStrips.length-1].x +(64 - this.offset),0,false));
            this.levelStripsCounter++;
        }
        this.levelDistance += 1;
    }
};

Level.prototype.getLevelDistance = function () {
    return this.levelDistance
};

Level.prototype.handleCollision = function (playerSprite,onCollide) {
    console.log("Checking Collision");
    for(var i = 0; i < this.levelStrips.length;i++){
        this.levelStrips[i].checkCollision(playerSprite,onCollide);
    }
};


/*
var Level = function () {
    //properties
    this.TRACKPIECENUM = 15;
    this.groundArray = [];
    this.roofArray = [];
    this.offset = 1;
    this.currentState = "Easy";

    //initLevel - Add level sprites to the array & update sprite Location
    for(var i = 0; i<this.TRACKPIECENUM;i++){
        this.groundArray.push(new TrackSprite(0,0, this.currentState));
        this.groundArray[i].setPosition(i * (this.groundArray[i].getWidth() -  this.offset),game.world.height - this.groundArray[i].getHeight());
        
        //Add sprites to roof array.
        this.roofArray.push(new TrackSprite(0,0, this.currentState));
        this.roofArray[i].setPosition(i * (this.roofArray[i].getWidth() - this.offset), 0);
    }

    this.levelDistance = 0;
};

//Update the level
Level.prototype.updateLevel = function () {
    //Variables to prevent using repeated calls
    var length = this.groundArray.length;
    var width = this.groundArray[length-2].getWidth();
    var newPieceGenerated = false;
    
    for(var i = 0;i<length;i++){

        //Check Posistion and regenerate if need be.
        if(this.groundArray[i].getX() <= 0 - this.groundArray[i].getWidth()){

            this.groundArray.splice(i,1);
            this.groundArray.push( new TrackSprite(0,0, this.currentState));
            newPieceGenerated = true;
        }

        //Check position and regenerate if need be.
        if(this.roofArray[i].getX() <= 0 - this.roofArray[i].getWidth()){

            this.roofArray.splice(i,1);
            this.roofArray.push(new TrackSprite(0,0, this.currentState));
            newPieceGenerated = true;
            
            //Update Level Distance
            this.levelDistance++;
        }
    }
    
    //Ensure all terrain sprites are positioned correctly without spacing.
    if(newPieceGenerated){
        
        for(var j = 1; j < length; j++){

            this.groundArray[j].setPosition(this.groundArray[j-1].getX() + (width - this.offset), game.world.height - this.groundArray[j].getHeight());
            this.roofArray[j].setPosition(this.roofArray[j-1].getX() + (width - this.offset), 0);
        }
    }
    
    //Move the terrain.
    for(var k = 0; k < length; k++){
        
        this.roofArray[k].movePosition(LEVELSPEEDX, LEVELSPEEDY);
        this.groundArray[k].movePosition(LEVELSPEEDX,LEVELSPEEDY);
    }
};

//Returns how many new blocks has been generated since the level has been generated. This will be used to calculate the ingame meters. 1 block = 1 meter.
Level.prototype.getLevelDistance = function () {
    return this.levelDistance;
};*/
