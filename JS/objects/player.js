/**
 * Player Object
 *
 * Changes :
 * Velocity added to prevent player moving backwards except after hitting wall.
 * hitGround method added as a callback for collision between player and ground. This will signal when player is allowed to jump.
 *
 * Bugs : Collision between player and ground seems to be happening too late causing them to overlap and thusprevent jumping.
 * 
 */

var Player = function(x, y){
    //Set Properties
    this.x = x;
    this.y = y;
    this.sprite = game.add.sprite(this.x, this.y, "player");
    this.velY = 2;
    this.jumpForce = -300;
    this.onGround = false;

    //enabled Physics
    game.physics.arcade.enable(this.sprite);

    //Set Physics properties
    this.sprite.body.bounce.y = 0.2;
    //Make the player velocity the inverse of the level speed to prevent constantly moving backwards.
    this.sprite.body.velocity.x = LEVELSPEEDX * -1;
    this.sprite.body.allowGravity = true;
    this.sprite.body.immovable = false;
};

//Apply Gravity
Player.prototype.applyGravity = function(){

    this.sprite.y += this.velY;
};

//Jump Sprite
Player.prototype.jump = function(){
    
    console.log("Jump pressed");
    
    if(this.sprite.body.touching.down){
    
        console.log("jumping");
        
        this.sprite.body.velocity.y = this.jumpForce;
        this.onGround = false;
    }
};

//Signal when player is on ground.
Player.prototype.hitGround = function(){
    
    if(!this.onGround){
        
        console.log("onGround callback triggered");
        this.onGround = true;
    }
};
