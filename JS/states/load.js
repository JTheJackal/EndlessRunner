/**
 * Created by Adam on 31/01/2017.
 */
var LoadState = {
    preload: function(){

        var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#ffffff"});

        //Load all the game assets.
        game.load.image("player", "GFX/player.png");
        game.load.image("small", "GFX/small.png");
        game.load.image("medium", "GFX/medium.png");
        game.load.image("big", "GFX/big.png");
        game.load.image("xBig", "GFX/xBig.png");


        //Start the physics system.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 30;

    },
    create: function () {
        game.state.start(STATES.PLAY);
    }
};