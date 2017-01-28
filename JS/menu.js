/**
 * Created by Joshua Styles on 27/01/2017.
 */

var menuState = {

    create: function(){

        //Graphics for menu screen will be added once made.
        //--------------------------------------------------

        var nameLabel = game.add.text(80, 80, "GAME TITLE", {font: "25px Arial", fill: "#FFFFFF"});

        var startLabel = game.add.text(80, game.world.height/2, "Press W to start", {font: "25px Arial", fill: "#FFFFFF"});

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        //Add callback for keypress.
        wKey.onDown.addOnce(this.start, this);
    },

    //The start function when key is pressed.
    start: function(){

        game.state.start("play.js");
    }
}