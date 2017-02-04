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
    this.velX = 0;
    this.rotation = this.sprite.angle;
    this.rotationMin=-20;
    this.rotationMax = 20;
    this.ascendForce = -150;
    this.minX = game.world.width/2 - 200;
    this.maxX = game.world.width/2 + 200;
    this.sfx = game.add.audio("helicopter");

    //play audio
    this.sfx.loop = true;
    this.sfx.play();

    //enabled Physics
    game.physics.arcade.enable(this.sprite);

    //Set Physics properties
    this.sprite.body.bounce.y = 0.2;

    //Set anchor for a smoother roatation
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    //Make the player velocity the inverse of the level speed to prevent constantly moving backwards.
    //this.sprite.body.velocity.x = LEVELSPEEDX * -1;
    this.sprite.body.allowGravity = true;
    this.sprite.body.immovable = false;
};

//Apply Gravity
Player.prototype.applyGravity = function(){
    this.sprite.y += this.velY;
};

//Ascend Helicopter Sprite
Player.prototype.ascend = function(){
    this.sprite.body.velocity.y = this.ascendForce;
};

//Control left & right movement of helicopter
Player.prototype.controlX = function (key) {
    console.log(key);
    switch(key){
        case "LeftKey":
            //Caluclate new velocity
            if(this.sprite.x>this.minX){
                this.velX = -40;
                this.rotation--;
            }else{
                this.velX = 0;
                this.rotation++;
            }
            break;
        case "RightKey":
            //Caluclate new velocity
            if(this.sprite.x<this.maxX){
                this.velX = 40;
            }else{
                this.velX=0;
            }
            this.rotation++;
            break;
        case "none":
            this.rotation++;
            this.velX=0;
            break;
    }

    //Calculate Rotation
    if(this.rotation >= this.rotationMax){
        this.rotation = this.rotationMax;
    }else if(this.rotation <= this.rotationMin){
        this.rotation = this.rotationMin;
    }

    this.sprite.angle = this.rotation;

    this.sprite.body.velocity.x = this.velX;
};

Player.prototype.endGame = function (onAnimationComplete) {
    //Stop current Sound
    this.sfx.stop();

    var x = this.sprite.x;
    var y = this.sprite.y;

    this.sprite.visible = false;

    //Set properties for explosion animation and play it.
    var explosion = game.add.sprite(x,y,"explosion");
    explosion.animations.add("explode");
    explosion.anchor.x = 0.5;
    explosion.anchor.y = 0.5;
    explosion.angle = this.rotation;
    explosion.animations.play("explode",30,false);
    explosion.animations.currentAnim.onComplete.add(onAnimationComplete);

    //set properties for explosion sound & play it.
    var sfx = game.add.audio("explosionSound");
    sfx.play();
};