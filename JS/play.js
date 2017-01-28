/**
 * Created by Joshua Styles on 27/01/2017.
 */

var TRACKPIECENUM = 15;
var LEVELSPEEDX = -2;
var LEVELSPEEDY = 0;
var levelArray = [];
var player;
var jumpKey;

var Player = function(x, y){

    this.x = x;
    this.y = y;
    this.sprite = game.add.sprite(this.x, this.y, "player");
    this.velY = 2;
    this.jumpForce = 5.0;

    game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.55;
    this.sprite.body.allowGravity = true;
    this.sprite.body.immovable = false;
};

Player.prototype.applyGravity = function(){

    this.sprite.y += this.velY;
};

Player.prototype.jump = function(){

    this.sprite.body.velocity.y = -250;
}

var TrackSprite = function(selector, x, y){

    this.x = x;
    this.y = y;

    switch(selector){

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
    }

    //Enable physics for the sprite. Allows collision detection.
    game.physics.arcade.enable(this.sprite);

    //Remove gravity for this sprite.
    this.sprite.body.allowGravity = false;
    this.sprite.body.immovable = true;
};

TrackSprite.prototype.setPosition = function(x, y){

    this.sprite.x = x;
    this.sprite.y = y;
};

TrackSprite.prototype.movePosition = function(speedX, speedY){

    this.sprite.x += speedX;
    this.sprite.y += speedY;
};

var playState = {

    create: function(){

        //Set up keyboard controls.
        jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        game.physics.arcade.gravity.y = 200;

        //Set up player
        player = new Player(100, game.world.height/2);

        //Generate  random pieces for track and add to array.
        for(var i = 0; i < TRACKPIECENUM; i++){

            levelArray.push(new TrackSprite(generateRandom(), 0, 0));
            levelArray[i].setPosition(0 + i * 64, game.world.height - levelArray[i].sprite.height);
        };
    },

    update: function(){

        manageLevel();
        managePlayer();
        manageCollisions();
    }
};

function manageLevel(){

    //Move the sprites at a set speed.
    for(var i = 0; i < levelArray.length; i++){

        levelArray[i].movePosition(LEVELSPEEDX, LEVELSPEEDY);

        //Check position and regenerate if needed.
        if(levelArray[i].sprite.x <= 0 - levelArray[i].sprite.width){

            levelArray.splice(i, 1);
            levelArray.push(new TrackSprite(generateRandom(), 0, 0));
            levelArray[levelArray.length-1].setPosition(levelArray[levelArray.length-2].sprite.x + levelArray[levelArray.length-2].sprite.width, game.world.height - levelArray[levelArray.length-1].sprite.height);
        }
    }
}

function managePlayer(){

    //player.applyGravity();
    if(jumpKey.isDown){

        player.jump();
    }
}

function manageCollisions(){

    for(var i = 0; i < levelArray.length; i++){

        game.physics.arcade.collide(player.sprite, levelArray[i].sprite);
    }
}

function generateRandom(){

    return Math.floor(Math.random() * 3);
}