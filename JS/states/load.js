/**
 * Created by Adam Walker and Joshua Styles on 31/01/2017.
 */


var LoadState = {
    preload: function(){

        var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#ffffff"});

        //Load all the game assets.
        game.load.image("player", "GFX/heli2.png");
        //game.load.image("drone", "GFX/drone.png");
        game.load.image("small", "GFX/small.png");
        game.load.image("small_R", "GFX/small_R.png");
        game.load.image("medium", "GFX/medium.png");
        game.load.image("medium_R", "GFX/medium_R.png");
        game.load.image("big", "GFX/big.png");
        game.load.image("big2", "GFX/big2.png");
        game.load.image("big3", "GFX/big3.png");
        game.load.image("xBig", "GFX/xBig.png");
        game.load.image("xBig2", "GFX/xBig2.png");
        game.load.image("xBig3", "GFX/xBig3.png");
        game.load.image("xxBig", "GFX/xxBig.png");
        game.load.image("xxxBig", "GFX/xxxBig.png");
        game.load.image("big_R", "GFX/big_R.png");
        game.load.image("big2_R", "GFX/big2_R.png");
        game.load.image("big3_R", "GFX/big3_R.png");
        game.load.image("xBig_R", "GFX/xBig_R.png");
        game.load.image("xBig2_R", "GFX/xBig2_R.png");
        game.load.image("xBig3_R", "GFX/xBig3_R.png");
        game.load.image("xxBig_R", "GFX/xxBig_R.png");
        game.load.image("xxxBig_R", "GFX/xxxBig_R.png");
        game.load.image("playN","GFX/PlayNormal.png");
        game.load.image("playH","GFX/PlayHover.png");
        game.load.image("highScoreN","GFX/highscoresNormal.png");
        game.load.image("highScoreH","GFX/highscoresHover.png");
        game.load.image("backN","GFX/BackNormal.png");
        game.load.image("backH","GFX/backHover.png");
        game.load.image("bg","GFX/bg.png");
        game.load.image("hsbg","GFX/hsbg.png");
        game.load.audio("helicopter","SFX/helicopter.mp3");
        game.load.audio("explosionSound","SFX/explosion.mp3");
        game.load.spritesheet("drone", "GFX/drone.png", 38, 32);
        game.load.spritesheet("explosion","GFX/explosion.png",64,64,16);
        game.load.spritesheet("playBTN", "GFX/playBTN.png", 200, 125);
        game.load.spritesheet("hsBTN", "GFX/hsBTN.png", 450, 125);
        game.load.spritesheet("aboutBTN", "GFX/aboutBTN.png", 250, 125);
        game.load.spritesheet("backBTN", "GFX/backBTN.png", 250, 125);

        //Start the physics system.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 30;

    },
    create: function () {
        game.state.start(STATES.MENU);
    }
};