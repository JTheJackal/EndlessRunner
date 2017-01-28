/**
 * Created by Joshua Styles on 27/01/2017.
 */

var loadState = {

    preload: function(){

        var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Courier", fill: "#ffffff"});

        //Load all the game assets.
        game.load.image("player", "GFX/player.png");
        game.load.image("small", "GFX/small.png");
        game.load.image("medium", "GFX/medium.png");
        game.load.image("big", "GFX/big.png");
        game.load.image("xBig", "GFX/xBig.png");

    },

    create: function(){

        //Call the splash state.
        game.state.start("splash.js");
    }
};