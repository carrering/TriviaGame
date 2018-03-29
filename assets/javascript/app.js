$(document).ready(function(){



    function Question(id, myQuestion, answers) {
        this.id = id
        this.myQuestion = myQuestion
        this.answers = answers
    }


    function Game(qCount, numCorrect, numWrong, numUnanswered){
        this.qCount = qCount//counter for current question
        this.numCorrect = numCorrect//number of correct guesses
        this.numWrong = numWrong// number of incorrect guesses
        this.numUnanswered = numUnanswered
    }

//hide the timer
    $("#timersection").hide()


var questionBank = [];

questionBank.push(new Question(1,"Which of these is NOT a Spice Girl?",["Dirty Spice","Sporty Spice","Scary Spice","Posh Spice"]),
                  new Question(2,"Which of these is NOT a character in Star Wars?",["Captain Picard","Luke Skywalker","General Grivious","Admiral Ackbar"]),
                  new Question(3,"Which of these countries are not in the European Union?",["Ukraine","Romania","Belgium","Croatia"]),
                  new Question(4,"Which character in Game of Thrones was beheaded?",["Ned Stark","Hodor","John Snow","Tywin Lannister"]),
                  new Question(5,"Which of these car manufacturers are not from Italy?",["Bugatti","Ferrari","Pagani","Fiat"]),
                  new Question(6,"What was the first model year of the Ford Mustang?",["1964 1/2","1965","1995","1908"]),
                  new Question(7,"In 'The Hitch Hikers Guide to the Galaxy' what is the answer to Life?",["42","Get'n Paid","Life is but a dream","YES"]),
                  new Question(8,"Which of these are not Korean brands?",["Huawei","LG","Samsung","Daewoo"]),
                  new Question(9,"Which song is NOT by the rock band Yeah Yeah Yeahs?",["Antidote","Maps","Heads Will Roll","Hysteric"]),
                  new Question(10,"Which of these are a Korean dish",["Gim Bop","Maki","Larb","Nan"])
)
// console.log(questionBank[4].answers[1]);


var game1 = new Game(0,0,0,0)

// create a new countdown
var myCounter = new Countdown({  
    seconds:10,  // number of seconds to count down
    onUpdateStatus: function(sec){console.log(sec);}, // callback for each second
    onCounterEnd: function(){ 
        $("#timersection").hide()
        $("#timerremainvalue").html("0")
        game1.numUnanswered+=1
        var correctAnswer = questionBank[game1.qCount].answers[0]
        $("#answers-view").html("<h2>TIME IS UP!!!</h2>")
        $("#answers-view").append("<h2>The answer was: "+ correctAnswer +"</h2>")
        console.log("unanswered count", game1.numUnanswered)
        console.log("timeout qCount: ", game1.qCount)
        //go to next question
            game1.qCount+=1
            setTimeout(function(){ 
                if(game1.qCount < questionBank.length){
                    myCounter.start()
                    renderButtons(game1.qCount)
                }
                else{
                    gameOver()
                }

            }, 3000);
                
            

        
    
    } // final action
});

//countdown timer
function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
        console.log("hey seconds are ZERO")
      counterEnd();
      instance.stop();
    }
    else{
        $("#timerremainvalue").html(seconds)
        seconds--;
        console.log(seconds)  
    }
 
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    console.log("countdown.start was called-seconds:",seconds)
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}


// Function for displaying movie data
function renderButtons(qNum) {
    $("#gameover").empty()
    $("#timersection").show()
    myCounter.start()
    // Deletes the buttons prior to adding new ones
    // (this is necessary otherwise you will have repeat buttons)
    $("#answers-view").empty()

    // Loops through the array of movies
    
    $("#theBigQ").html("<h3>"+questionBank[qNum].myQuestion+"</h3>")

    for (var i = 0; i < questionBank[qNum].answers.length; i++) {
        
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>")
      // Adds a class of movie to our button
      a.addClass("trivia")
      // Added a data-attribute
      a.attr("data-name", i)

      
      // Provided the initial button text
      a.text(questionBank[qNum].answers[i])
      // Added the button to the buttons-view div
      

      var random_boolean = Math.random() >= 0.5;
      console.log(random_boolean)
      if(random_boolean===true){//lets randomize the button order
        $("#answers-view").append(a)
      }
      else{
        $("#answers-view").prepend(a)
      }
    
    }

    
  }




    // This function handles start of the game when start button is clicked
    $(".startbtn").on("click", function(event) {
        event.preventDefault();
        $("#timersection").show()
        var qMax = questionBank.length
        console.log("max questions",qMax)
        renderButtons(game1.qCount)
        console.log("current question:",game1.qCount)
        //game1.qCount+=1
        console.log("startbutton qCount:",game1.qCount)
        $(".startbtn").hide()
     

      });



function gameOver(){
    //tell player he sucks and his score

    //then spawn a reset button

    var a = $("<button>")
    // Adds a class of reset to our button
    a.addClass("reset")
    // Added a data-attribute
    a.attr("data-name", "reset")

    
    // Provided the button text
    a.text("RESET")

    var tallyCorrect = "<h3>Correct Answers:&nbsp;" + game1.numCorrect + "</h3>"
    var tallyWrong = "<h3>Wrong Answers:&nbsp;" + game1.numWrong + "</h3>"
    var tallyUnanswered = "<h3>Unanswered:&nbsp;" + game1.numUnanswered + "</h3>"

    $("#resetholder").html(a)
    $("#gameover").html("<h3>All done, here is how you did!!</h3>")
    $("#gameover").append(tallyCorrect)
    $("#gameover").append(tallyWrong)
    $("#gameover").append(tallyUnanswered)
    $("#answers-view").html("")
    $("#theBigQ").html("")
    $("#timersection").hide()

}


function resetMeYo(){
    //reset

    game1 = new Game(0,0,0,0)
    $("#resetholder").html("")
    $("#gameover").html("")
    $(".startbtn").show()


}


function playTheGame() {
    myCounter.stop()
    var selectedAnswer = $(this).attr("data-name");
    var correctAnswer = questionBank[game1.qCount].answers[0]
    $("#timersection").hide()
    if(selectedAnswer === "0"){
        $("#answers-view").html("<h2>Correctamundo!</h2>")
        game1.numCorrect+=1
    }
    else{
        $("#answers-view").html("<h2>WRONG!!!</h2>")
        $("#answers-view").append("<h2>The answer was: "+ correctAnswer +"</h2>")
        game1.numWrong+=1
    }
    
    game1.qCount+=1//increment to next question
    setTimeout(function(){ 
        if(game1.qCount < questionBank.length){
            renderButtons(game1.qCount)
        }
        else{
            gameOver()
        }
    }, 3000)//wait 3 seconds then move on

    

    console.log("selectedAnswer:",selectedAnswer)


  }



      // Adding click event listeners to all elements with a class of "trivia"
      $(document).on("click", ".trivia", playTheGame);
      // Adding click event listeners to reset the game on button press
      $(document).on("click", ".reset", resetMeYo);

})