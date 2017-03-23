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
    create:function(){
        this.backgroundImg = game.add.image(0,0,'bg');
        this.btnStart = new Button(gameWidth / 2,(gameHeight/2)/2,'playN','playH',this.startOnClick);
        this.btnHighScore = new Button(gameWidth / 2,(gameHeight/2)/2 + gameHeight/2,'highScoreN','highScoreH',this.highscoreOnClick);
    }


};