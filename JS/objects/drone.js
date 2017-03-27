/**
 * Created by Adam Walker and Joshua Styles
 * Player Object
 *
 * Changes :
 *
 * Bugs : 
 * 
 */

var Drone = function(x, y){
    //Set Properties
    this.x = x;
    this.y = y;
    this.sprite = game.add.sprite(this.x, this.y, "drone");
    this.sprite.frame = 0;

    this.velY = 2;
    this.velX = 0;
    this.rotation = this.sprite.angle;
    this.rotationMin=-20;
    this.rotationMax = 20;
    this.ascendForce = -70;
    this.visionRange = 40;
    this.attacking = false;

    //enabled Physics
    game.physics.arcade.enable(this.sprite);

    //Set Physics properties
    this.sprite.body.bounce.y = 0.2;

    //Set anchor for a smoother roatation - Front of drone
    //this.sprite.anchor.x = 0.5;
    //this.sprite.anchor.y = 0.5;

    this.sprite.body.allowGravity = false;
    this.sprite.body.immovable = false;
};

//Tells if the sprite passed in is within range.
Drone.prototype.canSee = function(otherSprite){
    
    if(otherSprite.x >= this.sprite.x - this.visionRange){
        
        this.attacking = true;
        this.sprite.frame = 1;
        return true;
    }else{
        
        return false;
    }
};

Drone.prototype.attackPattern = function(otherSprite){
    
    if(this.sprite.y > otherSprite.y){
        
        this.ascend();
    }else{
        
        this.sprite.body.allowGravity = true;
    }
};

//Ascend drone
Drone.prototype.ascend = function(){
    this.sprite.body.velocity.y = this.ascendForce;
};

//Match the speed of the player.
Drone.prototype.matchSpeed = function(otherSprite){
    
    if(this.sprite.x < otherSprite.x + 128){
        this.sprite.body.velocity.x = 0;
    }
};

//Move posisition of drone.
Drone.prototype.movePosition = function(speedX, speedY){
    
    this.sprite.body.velocity.x = speedX;
};

Drone.prototype.explode = function () {

    var x = this.sprite.x;
    var y = this.sprite.y;

    this.sprite.kill();

    //Set properties for explosion animation and play it.
    var explosion = game.add.sprite(x,y,"explosion");
    explosion.animations.add("explode");
    explosion.anchor.x = 0.5;
    explosion.anchor.y = 0.5;
    explosion.angle = this.rotation;
    explosion.animations.play("explode",30,false);
    //explosion.animations.currentAnim.onComplete.add(onAnimationComplete);

    //set properties for explosion sound & play it.
    var sfx = game.add.audio("explosionSound");
    sfx.play();

};
