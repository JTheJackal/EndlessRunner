/**
 * Created by Joshua Styles on 27/01/2017.
 */

var bootState = {

    create: function(){

        //Start the physics system.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Call the load state.
        game.state.start("load.js");
    }
}