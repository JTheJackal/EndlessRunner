//By Joshua Styles and Adam Walker
//20/01/2017

var game;

game = new Phaser.Game(800, 600, Phaser.AUTO, "canvas");

game.state.add("boot.js", bootState);
game.state.add("load.js", loadState);
game.state.add("splash.js", splashState);
game.state.add("menu.js", menuState);
game.state.add("play.js", playState);
/*
game.state.add("about.js", aboutState);
game.state.add("highscores.js", highscoresState);
*/

game.state.start("boot.js");
