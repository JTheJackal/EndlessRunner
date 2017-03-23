/**
 * Created by Adam Walker and Joshua Styles on 31/01/2017.
 *
 * Changes:
 *
 *
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
        } else{
            this.player.controlX("none")
        }
    },
   
    gameDifficulty: function(){
        
        var levelDistance = this.level.getLevelDistance();
        
        //Every 10m, increase the speed.
        if(levelDistance % 10 === 0 && levelDistance != 0 && levelDistance === PlayState.previousDistance + 10){
            PlayState.previousDistance = levelDistance;
            LEVELSPEEDX -= 5;
        }
        
        //Increase the types of sprites used at set distances.
        switch(levelDistance){
                
            case 30:
                
                this.level.currentState = "Medium";
                break;
                
            case 60:
                
                this.level.currentState = "Hard";
                break;
        }
    },

    handleCollisions: function () {
        
        //Check all terrain sprites against helicopter sprite for a collision.
        for(var i = 0; i < this.level.groundArray.length; i++){
            
            game.physics.arcade.collide(this.player.sprite, this.level.groundArray[i].sprite, null, this.gameOver);
            game.physics.arcade.collide(this.player.sprite, this.level.roofArray[i].sprite, null, this.gameOver);
            
            //To handle the collision ourselves i.e. have the helicopter explode, use a callback like below.
            //game.physics.arcade.collide(this.player.sprite, this.level.groundArray[i].sprite, null, mycustomCallback);
        }
    },
    gameOver: function(){
        var parent  = PlayState;
        parent.player.endGame(function () {
            if(parent.highscoreSystem.isHighScore(parent.level.getLevelDistance())){
                console.log("HighScore");
                var name = window.prompt("You got a highscore! Please enter your name:");
                parent.highscoreSystem.setHighScores(name,parent.level.getLevelDistance())
            }
            //Reset game.
            LEVELSPEEDX = -80;
            game.state.start(STATES.LOAD);
        })},
    
    create: function () {

        //Create Objects
        this.player = new Player(game.world.width / 2, game.world.height / 2);
        this.level = new Level();
        this.UIGroup = game.add.group();
        this.endGame = false;

        this.previousDistance = 0;

        //Display level Distance
        this.LevelDistance = game.add.text(10, 10, "Distance = " + this.level.getLevelDistance() + "m", {
            font: "24px Courier",
            fill: "#ffffff"
        });
        //Assign the UI group.
        this.UIGroup.add(this.LevelDistance);

        //Create a variable for key press for player jump
        this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = game.input.keyboard.createCursorKeys();

        this.highscoreSystem = new HighScoreSystem();

        //Apply Physics
        game.physics.arcade.gravity.y = 200;
    },
    
    update: function () {

        //Update Level
        this.level.updateLevel();

        this.handleInput();

        //Check for collisions
        this.handleCollisions();
        
        //Handle the difficulty level
        this.gameDifficulty();

        //Display level Distance
        this.LevelDistance.setText("Distance: " + this.level.getLevelDistance() + "m\n" + "Speed: " + LEVELSPEEDX + "\nDifficulty: " + this.level.currentState);
        
        //Make the UI group always on top.
        game.world.bringToTop(this.UIGroup);
    }
};

