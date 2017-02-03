/**
 * Level Object
 * 
 * Changes
 * Added level generator (Addaption of code that was used before)
 * Added offsets to track piece positions to prevent gaps showing.
 *
 * Bugs
 */

var Level = function () {
    //properties
    this.TRACKPIECENUM = 15;
    this.levelArray = [];

    //initLevel - Add level sprites to the array & update sprite Location
    for(var i = 0; i<this.TRACKPIECENUM;i++){
        this.levelArray.push(new TrackSprite(0,0));
        this.levelArray[i].setPosition(i * (this.levelArray[i].getWidth() - 1),game.world.height - this.levelArray[i].getHeight());
    }

    this.levelDistance = 0;
};

//Update the level
Level.prototype.updateLevel = function () {
    var length = this.levelArray.length;
    for(var i = 0;i<length;i++){

        this.levelArray[i].movePosition(LEVELSPEEDX,LEVELSPEEDY);

        //Check Posistion and regenerate if need be.
        if(this.levelArray[i].getX() <= 0 - this.levelArray[i].getWidth()){

            this.levelArray.splice(i,1);
            this.levelArray.push( new TrackSprite(0,0));
            this.levelArray[length-1].setPosition(this.levelArray[length-2].getX()+ (this.levelArray[length-2].getWidth() -2),
                                                  game.world.height - this.levelArray[length-1].getHeight())

            //Update Level Distance
            this.levelDistance++;
        }
    }
};

//Returns how many new blocks has been generated since the level has been generated. This will be used to calculate the ingame meters. 1 block = 1 meter.
Level.prototype.getLevelDistance = function () {
    return this.levelDistance;
};