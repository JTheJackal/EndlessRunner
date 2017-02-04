/**
 * Created by Adam on 31/01/2017.
 */
var PlayState = {
    handleInput: function () {
        //Check to if helicopter needs to ascend.
        if (this.jumpKey.isDown) {
            this.player.ascend();
        }
        //Check if helicopter needs to move
        if(this.cursors.left.isDown){
            this.player.controlX("LeftKey")
        }else if(this.cursors.right.isDown){
            this.player.controlX("RightKey")
        }else if(this.cursors.up.isDown) {
            this.player.endGame(function () {
                game.state.start(STATES.LOAD);
            })
        } else{
            this.player.controlX("none")
        }
    },
    create: function () {

        //Create Objects
        this.player = new Player(game.world.width / 2, game.world.height / 2);
        this.level = new Level();
        //Display level Distance
        this.LevelDistance = game.add.text(10, 10, "Distance = " + this.level.getLevelDistance() + "m", {
            font: "30px Courier",
            fill: "#ffffff"
        });

        //Create a variable for key press for player jump
        this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = game.input.keyboard.createCursorKeys();

        //Apply Physics
        game.physics.arcade.gravity.y = 200;
    },
    update: function () {

        //Update Level
        this.level.updateLevel();

        this.handleInput();

        //Check for collisions

        //Display level Distance
        this.LevelDistance.setText("Distance = " + this.level.getLevelDistance() + "m");
    }
};

