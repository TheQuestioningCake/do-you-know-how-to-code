var containerQuestionEl = document.getElementById("question-box");
      var startEl = document.getElementById("starter-box");
      var endEl = document.getElementById("end-box")
      var scoreEl = document.getElementById("score-banner")
      var intialForm = document.getElementById("initials-form")
      var highScoreBox = document.getElementById("high-score-box")
      var ViewHighScoreEl = document.getElementById("show-high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      var correctEl = document.getElementById("correct")
      var wrongEl = document.getElementById("wrong")
      var startButtonEl = document.querySelector("#start-game");
      var goBackBtn = document.querySelector("#go-back")
      var clearScoreBtn = document.querySelector("#clear-high-scores")
      var questionEl = document.getElementById("question")
      var answerbuttonsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timeleft;
      var gameover
      timerEl.innerText = 0;

      //High Score Array
      var HighScores = [];

       //assign array details for questions 
      var arrayShuffledQuestions
      var QuestionIndex = 0

    
      
      // questions array
      var questions = [
        { q: 'Arrays in Javascript can be used to store __________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
        },
        { q: 'What tag do we use to link our HTML and Javascript?', 
          a: '3. <script>', 
          choices: [{choice: '1. <style.css>'}, {choice: '2. <js>'}, {choice: '3. <script>'}, {choice: '4. <java>'}]
        },
        { q: 'Which one is considered a Boolean?', 
          a: '1. false', 
          choices: [{choice: '1. false'}, {choice: '2. undefined'}, {choice: '3. variable'}, {choice: '4. all of the above'}]
        },
        { q: 'How do you call a function?', 
          a: '4. "function name"()', 
          choices: [{choice: '1. ()'}, {choice: '2. funky funk'}, {choice: '3. call function'}, {choice: '4. "function name"()'}]
        },
        { q: 'How would you create a string?', 
          a: '1. " "', 
          choices: [{choice: '1. " "'}, {choice: '2. { }'}, {choice: '3. ( )'}, {choice: '4. [ ]'}]
        },
        { q: 'How do you add one to an index?', 
          a: '2. i++', 
          choices: [{choice: '1. i+'}, {choice: '2. i++'}, {choice: '3. i**'}, {choice: '4. i-+'}]
        },
        { q: 'How many times can you assign an ID?', 
          a: '2. once', 
          choices: [{choice: '1. twice'}, {choice: '2. once'}, {choice: '3. four times'}, {choice: '4. never'}]
        },
        { q: 'Bonus: Who is the best Coder?',
          a: '2. Wayne Perry!!',
          choices: [{choice: '1. You'}, {choice: '2. Wayne Perry!!'}, {choice: '3. The guy next to you'}, {choice: '4. Gerson'}]
        },
      ];
      
       
    var renderStartPage = function () {
        highScoreBox.classList.add("hide")
        highScoreBox.classList.remove("show")
        startEl.classList.remove("hide")
        startEl.classList.add("show")
        scoreEl.removeChild(scoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    
    var setTime = function () {
        timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    // when the game starts allows the information on the screen to be shown or hidden
    var startGame = function() {
        startEl.classList.add('hide');
        startEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    
    
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

   
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    
    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };
    
        //displays for correct! and wrong! on screen
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  
    
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    //checks for correct answer    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 5
            }

            else {
              answerWrong()
              score = score - 3;
              timeleft = timeleft - 5;
          };

        //tells the computer to go to the next question if there are any
          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

        //Displays score
    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        endEl.classList.remove("hide");
        endEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        scoreEl.appendChild(scoreDisplay);
    }       
    
  
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      intialForm.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

      
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    
    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }
    
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    
    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    //Highscore screen
    var displayHighScores = function() {

        highScoreBox.classList.remove("hide");
        highScoreBox.classList.add("show");
        gameover = "true"

        if (endEl.className = "show") {
            endEl.classList.remove("show");
            endEl.classList.add("hide");
            }
        if (startEl.className = "show") {
            startEl.classList.remove("show");
            startEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }
    
    var clearScores = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      //event listeners
      startButtonEl.addEventListener("click", startGame)
    
      intialForm.addEventListener("submit", createHighScore)

      ViewHighScoreEl.addEventListener("click", displayHighScores)
      
      goBackBtn.addEventListener("click", renderStartPage)
      
      clearScoreBtn.addEventListener("click", clearScores)