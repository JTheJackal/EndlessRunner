/**
 * Created by Adam Walker and Joshua Styles on 31/01/2017.
 */


var LoadState = {
    preload: function(){

        var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#ffffff"});

        //Load all the game assets.
        game.load.image("player", "GFX/heli.png");
        game.load.image("small", "GFX/small.png");
        game.load.image("medium", "GFX/medium.png");
        game.load.image("big", "GFX/big.png");
        game.load.image("xBig", "GFX/xBig.png");
        game.load.image("xxBig", "GFX/xxBig.png");
        game.load.image("xxxBig", "GFX/xxxBig.png");
        game.load.image("playN","GFX/PlayNormal.png");
        game.load.image("playH","GFX/PlayHover.png");
        game.load.image("highScoreN","GFX/highscoresNormal.png");
        game.load.image("highScoreH","GFX/highscoresHover.png");
        game.load.image("backN","GFX/BackNormal.png");
        game.load.image("backH","GFX/backHover.png");
        game.load.image("bg","GFX/bg.jpg");
        game.load.audio("helicopter","SFX/helicopter.mp3");
        game.load.audio("explosionSound","SFX/explosion.mp3");
        game.load.spritesheet("explosion","GFX/explosion.png",64,64,16);

        //Start the physics system.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 30;

    },
    create: function () {
        game.state.start(STATES.MENU);
    }
};