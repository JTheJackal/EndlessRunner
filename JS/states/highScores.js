/**
 * Created by Adam on 23/03/2017.
 */
var highscoreState =  {
    drawScores: function (topTenScores) {
        var startY = 65;

        this.hsText = game.add.text(gameWidth/2,startY,"High Scores" ,{ font: 'Monotype Corsiva', fontSize: '36px', fill: '#FFFFFF' });
        this.hsText.anchor.setTo(0.5);
startY+=40;

        //Clear labels


        var scores = topTenScores;
        console.log(scores);
        var keys = Object.keys(scores);
        for(var i = 0;i<keys.length;i++){
            var hs = game.add.text(gameWidth/2,startY,scores[keys[i]].name + "         " + scores[keys[i]].score  ,{ font: 'Monotype Corsiva', fontSize: '18px', fill: '#FFFFFF' });
            hs.anchor.setTo(0.5);
            startY +=40;
        }
    },
    backOnClick:function(){
        game.state.start(STATES.MENU);
    },
    create:function(){
        this.backgroundImg = game.add.image(0,0,'hsbg');
        //this.btnback= new Button(gameWidth / 2,gameHeight-60,'backN','backH',this.backOnClick);
        this.btnback = game.add.button(game.world.centerX - 125, gameHeight-140, "backBTN", this.backOnClick, this, 1, 0, 0);
        this.highScoreSystem = new HighScoreSystem(this.drawScores);
}


};