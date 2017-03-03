/**
 * Created by Adam Walker and Joshua Styles
 * Object for sprites of the map.
 *
 * Changes:
 * Put random number generator within the class to get rid of stray function.
 * Added functions for getting Width & Height of object
 * Changed method movePosition to use velocity instead of changing x values to fix collision bug.
 *
 */

var TrackSprite = function(x, y, currentState) {

    //Generate Random Number for sprite depending on the current state
    var selector;
    
    switch (currentState) {
            
            
        case "Easy":
            
            selector = Math.floor(Math.random() * 3);
            break;
            
        case "Medium": 
            
            selector = Math.floor(Math.random() * 4);
            break;
            
        case "Hard": 
            
            selector = Math.floor(Math.random() * 5);
            break;     
    }

    //Get the X & Y for the object
    this.x = x;
    this.y = y;

    //Check which sprite to use & save it as the sprite
    switch (selector) {

        case 0:

            this.sprite = game.add.sprite(this.x, this.y, "small");
            break;

        case 1:

            this.sprite = game.add.sprite(this.x, this.y, "medium");
            break;

        case 2:

            this.sprite = game.add.sprite(this.x, this.y, "big");
            break;

        case 3:

            this.sprite = game.add.sprite(this.x, this.y, "xBig");
            break;
        
        case 4:

            this.sprite = game.add.sprite(this.x, this.y, "xxBig");
            break;
            
        case 5:

            this.sprite = game.add.sprite(this.x, this.y, "xxxBig");
            break;
    }

    //Enable physics for the sprite. Allows collision detection.
    game.physics.arcade.enable(this.sprite);

    //Remove gravity for this sprite.
    this.sprite.body.allowGravity = false;
    this.sprite.body.immovable = true;
};

//Set X & Y of sprite
TrackSprite.prototype.setPosition = function(x, y){
    this.sprite.x = x;
    this.sprite.y = y;
};

//Move posisition of sprite
TrackSprite.prototype.movePosition = function(speedX, speedY){
    
    this.sprite.body.velocity.x = speedX;
};

//Returns the width of the object
TrackSprite.prototype.getWidth = function () {
    return this.sprite.width;
};

//Returns the height of the object
TrackSprite.prototype.getHeight = function () {
    return this.sprite.height;
};

//Returns X of object
TrackSprite.prototype.getX = function () {
    return this.sprite.x;
};

//return Y of object
TrackSprite.prototype.getY = function () {
    return this.sprite.y;
};