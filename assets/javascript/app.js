$(document).ready(function(){



    function Question(id, myQuestion, answers) {
        this.id = id
        this.myQuestion = myQuestion
        this.answers = answers
    }


    function Game(qCount, numCorrect, numWrong){
        this.qCount = qCount
        this.numCorrect = numCorrect
        this.numWrong = numWrong
    }

var game1 = new Game(0,0,0)

var questionBank = [];

questionBank.push(new Question(1,"Which of these is NOT a Spice Girl?",["Dirty Spice","Sporty Spice","Scary Spice","Posh Spice"]),
                  new Question(2,"Which of these is NOT a character in Star Wars?",["Captain Picard","Luke Skywalker","General Grivious","Admiral Ackbar"]),
                  new Question(3,"Which of these countries are not in the European Union?",["Ukraine","Romania","Belgium","Croatia"]),
                  new Question(4,"Which character in Game of Thrones was beheaded?",["Ned Stark","Hodor","John Snow","Tywin Lannister"]),
                  new Question(5,"Which of these car manufacturers are not from Italy?",["Bugatti","Ferrari","Pagani","Fiat"])
)
// console.log(questionBank[4].answers[1]);



var myCounter = new Countdown({  
    seconds:5,  // number of seconds to count down
    onUpdateStatus: function(sec){console.log(sec);}, // callback for each second
    onCounterEnd: function(){ 
        $("#timerremainvalue").html("0")
        alert('game over!');
    
    } // final action
});


function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    else{
        seconds--;
        $("#timerremainvalue").html(seconds)
        console.log(seconds)  
    }
 
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}












// create a countdown timer
// function countdown(timeLeft,timerID) {

   


//   if (timeLeft === 0) {
//     alert("game over!")
//     $("#timerremainvalue").html("0")  
//     clearInterval(timerId);
//   } else {
//     $("#timerremainvalue").html(timeLeft)
//     console.log(timeLeft)
//     timeLeft--;
//   }
// }


// Function for displaying movie data
function renderButtons(qNum) {

    // Deletes the buttons prior to adding new ones
    // (this is necessary otherwise you will have repeat buttons)
    $("#answers-view").empty();

    // Loops through the array of movies
    
    $("#theBigQ").html("<h3>"+questionBank[qNum].myQuestion+"</h3>")

    for (var i = 0; i < questionBank[qNum].answers.length; i++) {
        
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("trivia");
      // Added a data-attribute
      a.attr("data-name", i);

      
      // Provided the initial button text
      a.text(questionBank[qNum].answers[i]);
      // Added the button to the buttons-view div
      

      var random_boolean = Math.random() >= 0.5;
      console.log(random_boolean)
      if(random_boolean===true){//lets randomize the button order
        $("#answers-view").append(a);
      }
      else{
        $("#answers-view").prepend(a);
      }
    
    }
  }




    // This function handles start of the game when start button is clicked
    $(".startbtn").on("click", function(event) {
        event.preventDefault();
        var qMax = questionBank.length
        console.log("max questions",qMax)
        renderButtons(game1.qCount)
        console.log("current question:",game1.qCount)
        game1.qCount+=1
        $(".startbtn").hide()
        myCounter.start();

      });




})