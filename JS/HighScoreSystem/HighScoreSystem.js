/**
 * Created by Adam on 02/02/2017.
 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyADO96La91_XNWaTlgxhrWa3WW0GetqU2o",
    authDomain: "highscores-4e61f.firebaseapp.com",
    databaseURL: "https://highscores-4e61f.firebaseio.com",
    storageBucket: "highscores-4e61f.appspot.com",
    messagingSenderId: "722086961676"
};
firebase.initializeApp(config);


var HighScoreSystem = function () {

    var database = firebase.database();
    var scoreRef = database.ref("scores/");

    var scoreBoard = [];

    this.getHighScores = function (amount) {
        
    };
    
    this.setHighScore = function(name, score){

    }

};