/**
 * Created by Adam on 31/01/2017.
 */
var PlayState = {
  create: function () {
      
      //Create Objects
      this.player = new Player(100,game.world.height/2);
      this.level = new Level();
      //Display level Distance
      this.LevelDistance = game.add.text(10, 10, "Distance = " + this.level.getLevelDistance() + "m", {font: "30px Courier", fill: "#ffffff"});

      //Create a variable for key press for player jump
      this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      //Apply Physics
      game.physics.arcade.gravity.y = 200;
  },
     update: function () {
         
         //Update Level
        this.level.updateLevel();

         //Check to see if player needs updated
         if(this.jumpKey.isDown){
             
             this.player.jump();
         }

        //Check for collisions
         for(var i = 0; i < this.level.levelArray.length; i++){

             game.physics.arcade.collide(this.player.sprite, this.level.levelArray[i].sprite, null, hitGround, this);
             game.physics.arcade.overlap(this.player.sprite, this.level.levelArray[i].sprite, function () {
                 
                 console.log("true")
             }, function () {
                 
                 console.log(false);
             });

         }

         //Display level Distance
         this.LevelDistance.setText("Distance = " + this.level.getLevelDistance() + "m");
    }
};

//Callback for contact between player and ground.
function hitGround(){
    
    PlayState.player.hitGround();
}