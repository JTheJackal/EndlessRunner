/**
 * Created by Adam Walker and Joshua Styles on 31/01/2017.
 */

var aboutState =  {
    
    drawText: function (topTenScores) {
        var startY = 65;
        var headText;
        var aboutText;
        var headStyle = {font: 'Monotype Corsiva', fontSize: '36px', fill: '#FFFFFF' };
        var textStyle = {font: 'Monotype Corsiva', fontSize: '18px', fill: '#FFFFFF' };
    
        var paragraph = "The year is 2050 and technology has come a long way over the years.\n The police have replaced all of their aircrafts with new, automated\n drones but quickly lost control of them. You must escape the city in\n your helicopter, avoiding the buildings and out of control drones.\n\n Use the spacebar to make your helicopter ascend. Left and Right\n arrow keys to move forwards and backwards.\n\n\n\nDrone Zone was created by Joshua Styles and Adam Walker, 2017.";

        headText = game.add.text(gameWidth/2, startY, "About" , headStyle);
        headText.anchor.setTo(0.5);
        startY += 240;
        
        aboutText = game.add.text(gameWidth/2, startY, paragraph, textStyle);
        aboutText.anchor.setTo(0.5);
    },
    
    backOnClick:function(){
        game.state.start(STATES.MENU);
    },
    
    create:function(){
        this.backgroundImg = game.add.image(0,0,'hsbg');
        this.drawText();
        this.btnback = game.add.button(game.world.centerX - 125, gameHeight-140, "backBTN", this.backOnClick, this, 1, 0, 0);
    }
};
