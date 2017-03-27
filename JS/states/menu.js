/**
 * Created by Adam Walker and Joshua Styles on 31/01/2017.
 */
var MenuState =  {
    startOnClick:function(){
        game.state.start(STATES.PLAY);
    },
    highscoreOnClick:function(){
        game.state.start(STATES.HIGH_SCORE);
    },
    aboutOnClick:function(){
        //Not yet implemented.
    },
    create:function(){
        this.backgroundImg = game.add.image(0,0,'bg');
        //this.btnStart = new Button(gameWidth / 2,(gameHeight/2)/2,'playN','playH',this.startOnClick);
        this.btnStart = game.add.button(game.world.centerX - 100, game.world.centerY - 100, "playBTN", this.startOnClick, this, 1, 0, 0);
        this.btnHighScore = game.add.button(game.world.centerX - 225, game.world.centerY, "hsBTN", this.highscoreOnClick, this, 1, 0, 0);
        this.btnAbout = game.add.button(game.world.centerX - 125, game.world.centerY + 100, "aboutBTN", this.aboutOnClick, this, 1, 0, 0);
        //this.btnHighScore = new Button(gameWidth / 2,(gameHeight/2)/2 + gameHeight/2,'highScoreN','highScoreH',this.highscoreOnClick);
    }
};