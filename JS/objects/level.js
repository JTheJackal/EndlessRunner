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

var Level = function () {
    //properties
    this.TRACKPIECENUM = 15;
    this.groundArray = [];
    this.roofArray = [];
    this.offset = 1;

    //initLevel - Add level sprites to the array & update sprite Location
    for(var i = 0; i<this.TRACKPIECENUM;i++){
        this.groundArray.push(new TrackSprite(0,0));
        this.groundArray[i].setPosition(i * (this.groundArray[i].getWidth() -  this.offset),game.world.height - this.groundArray[i].getHeight());
        
        //Add sprites to roof array.
        this.roofArray.push(new TrackSprite(0,0));
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
            this.groundArray.push( new TrackSprite(0,0));
            //this.groundArray[length-1].setPosition(this.groundArray[length-2].getX()+ (this.groundArray[length-2].getWidth() - this.offset), game.world.height - this.groundArray[length-1].getHeight());
            //this.groundArray[length-1].setPosition(this.groundArray[length-2].getX()+ (width), game.world.height - this.groundArray[length-1].getHeight());
            newPieceGenerated = true;
        }

        //Check position and regenerate if need be.
        if(this.roofArray[i].getX() <= 0 - this.roofArray[i].getWidth()){

            this.roofArray.splice(i,1);
            this.roofArray.push(new TrackSprite(0,0));
            //this.roofArray[length-1].setPosition(this.roofArray[length-2].getX()+(this.roofArray[length-2].getWidth() - this.offset), 0);
            //this.roofArray[length-1].setPosition(this.roofArray[length-2].getX()+(width), 0);
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
};