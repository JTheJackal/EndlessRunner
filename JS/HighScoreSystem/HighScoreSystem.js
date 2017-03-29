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


//Object for highscores
var HighScoreSystem = function (callback) {
    //Sign the user in anonymously
    firebase.auth().signInAnonymously();

    //Variables for firebase
    var database = firebase.database();
    this.scoreRef = database.ref("scores/");

    //Variable for high score
    var highScores = [];

    //Fills high scores with call back from firebase
    var getHighScores = function (snapshot) {
        console.log("Getting data");
        var i = 0;
        snapshot.forEach(function (child) {
            highScores[i] = child.val();
            i++;
        });

        orderHighScores();

        if(callback){
            callback(getTopTenScores())
        }

    };

    //order the high scores
    var orderHighScores = function () {
        var tmpScores = highScores;

        var swapped;
        do {
            swapped = false;
            for (var i=0; i < tmpScores.length-1; i++) {
                if (tmpScores[i].score < tmpScores[i+1].score) {
                    var temp = tmpScores[i];
                    tmpScores[i] = tmpScores[i+1];
                    tmpScores[i+1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    };

    //Check to see if a score is in the top ten scores.
    this.isHighScore = function (score) {
        var length = highScores.length - 1;
        if(score >= highScores[length].score){
            return true;
        }else{
            return false;
        }
    };
    //return the top ten scores
    var getTopTenScores = function () {
        var tmpScores = [];

        for(var i = 0;i<10;i++){
            if(!(typeof highScores[i] === 'undefined')){
                tmpScores[i] = highScores[i];
            }
        }
    console.log(tmpScores);
        return tmpScores
    };
    //Sets the high score in firebase.
    this.setHighScores = function (name,score) {
        this.scoreRef.child(firebase.auth().currentUser.uid).set({
            name:name,
            score:score,
            date:Date.now()
        })
    };

    //Retrieves the data from firebase.
    this.scoreRef.on("value",getHighScores)
};

HighScoreSystem.prototype.stopListening = function(){
    
    this.scoreRef.off();
};