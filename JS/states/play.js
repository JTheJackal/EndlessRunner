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
    
    handleDrones: function(){
        
        var levelDistance = this.level.getLevelDistance();
        var baseDistance = this.level.getBaseLevelDistance();

        //If there is a drone active...
        if(this.droneExists){
            
            //Apply movement if the drone is not in it's attack state.
            if(!this.drone.attacking){

                this.drone.movePosition(LEVELSPEEDX, LEVELSPEEDY);
            }

            //Check for the player being within the drone's range.
            if(this.drone.canSee(this.player.sprite)){

                console.log("Player Spotted");
                this.drone.matchSpeed(this.player.sprite);
                this.drone.attackPattern(this.player.sprite);
            }
        }

        //Create a drone at random intervals.
        if(levelDistance >= baseDistance + this.droneGenerationDistance){

            this.droneExists = true;
            //Create a new Drone.
            this.drone = new Drone(this.level.roofArray[this.level.roofArray.length -1].getX() + 32, this.level.roofArray[this.level.roofArray.length -1].getY()
                                   + this.level.roofArray[this.level.roofArray.length -1].getHeight() + 48);
            
            this.level.baseLevelDistance = levelDistance;
        }
    },

    handleCollisions: function () {
        
        //Check for collisions between...
        for(var i = 0; i < this.level.groundArray.length; i++){
            
            //...player and terrain sprites.
            game.physics.arcade.collide(this.player.sprite, this.level.groundArray[i].sprite, null, this.gameOver);
            game.physics.arcade.collide(this.player.sprite, this.level.roofArray[i].sprite, null, this.gameOver);
            
            if(this.droneExists){
                
                //...drone and terrain sprites.
                game.physics.arcade.collide(this.drone.sprite, this.level.groundArray[i].sprite, null, this.droneCollision);
                game.physics.arcade.collide(this.drone.sprite, this.level.roofArray[i].sprite, null, this.droneCollision);
            }
            
            //To handle the collision ourselves i.e. have the helicopter explode, use a callback like below.
            //game.physics.arcade.collide(this.player.sprite, this.level.groundArray[i].sprite, null, mycustomCallback);
        }
        
        //...Drone and player sprites.
        if(this.droneExists){
                
            game.physics.arcade.collide(this.player.sprite, this.drone.sprite, null, this.airCollision);
        }
    },
    
    droneCollision: function(){
        
        PlayState.drone.explode();
        this.droneExists = false;
    }, 
    
    airCollision: function(){
        
        var parent = PlayState;
        parent.drone.explode();
        parent.gameOver();
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
        this.droneExists = false;
        this.drone = null;
        this.droneGenerationDistance = 25;

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
        
        //Update drones
        this.handleDrones();

        //Deal with player input.
        this.handleInput();

        //Check for collisions
        this.handleCollisions();
        
        //Handle the difficulty level
        this.gameDifficulty();

        //Display level Distance
        this.LevelDistance.setText("Distance: " + this.level.getLevelDistance() + "m\n" + "Speed: " + LEVELSPEEDX + "\nDifficulty: " + this.level.currentState);
        
        //Make the UI group always on top.
        game.world.bringToTop(this.UIGroup);
    },
    
    render: function(){
        
        //For debugging collision boxes only.
        //game.debug.body(this.player.sprite);
    }
};

