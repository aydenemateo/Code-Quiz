let qIndex = 0;

let time = 40;

const questions = [
  {
    q: "What is the proper function syntax?",
    answers: ["func(){};", "function{}[];", "!func(){}:", "function(){};"],
    a: "function(){};",
  },
  {
    q: "What does Document.querySelector() do?",
    answers: [
      "Changes the document styling",
      "Shows the key code",
      "Selects a CSS selector",
      "Starts a function",
    ],
    a: "Selects a CSS selector",
  },
  {
    q: "Which of these is NOT a data type supported by JavaScript?",
    answers: [
      "Null",
      "Boolean",
      "Word",
      "Number",
    ],
    a: "Word",
  },
  {
    q: "How would you stop event bubbling?",
    answers: ["Tell it to stop", ".stopBubble", ".stopPropagation", ".stopNow"],
    a: ".stopPropagation",
  },
  {
    q: "Which is NOT a way to define a variable?",
    answers: [
      "Const",
      "Com",
      "Var",
      "Let",
    ],
    a: "Com",
  },
];

const highScoreList = JSON.parse(localStorage.getItem("highscores")) || [];

const startBtn = document.getElementById("start-btn");

const startQuizDiv = document.getElementById("start-quiz");

const questionDiv = document.getElementById("question-div");

const questionBox = document.getElementById("question");

const answerOne = document.getElementById("answer-1");

const answerTwo = document.getElementById("answer-2");

const answerThree = document.getElementById("answer-3");

const answerFour = document.getElementById("answer-4");

const rightWrong = document.getElementById("right-wrong");

const timer = document.getElementById("timer");

const mainContent = document.getElementById("main-content");

const initialDiv = document.getElementById("initial-div");

const initialInput = document.getElementById("initial-input");

const initialBtn = document.getElementById("initial-btn");

const yourScore = document.getElementById("your-score");

let intervalId;

function startGame() {
  startQuizDiv.classList.add("hidden");
  questionDiv.classList.remove("hidden");

  questionBox.innerText = questions[qIndex].q;
  answerOne.innerText = questions[qIndex].answers[0];
  answerTwo.innerText = questions[qIndex].answers[1];
  answerThree.innerText = questions[qIndex].answers[2];
  answerFour.innerText = questions[qIndex].answers[3];
}

questionDiv.addEventListener("click", function (e) {
  console.log(e.target.innerText);

  let correct;

  if (e.target.innerText == questions[qIndex].a) {
    let correct = true;
    correctOrNot(correct);
    console.log(qIndex);

  } else {
    correct = false;
    time -= 10;
    console.log("whoops");
    correctOrNot(correct);
    console.log(qIndex);

  }
  if (qIndex < questions.length - 1) {
    qIndex++;
    startGame();
  } else {
    endGame();
  }
});

function timerFunction() {
  if (time > 0) {
    timer.innerText = time--;
  } else if (time == 0 || time < 0) {
    endGame();

    clearInterval(intervalId);
  }
  timer.innerText = time;
}

function correctOrNot(correct) {
  if (correct == true) {
    rightWrong.innerText = "Correct!";
    rightWrong.classList.remove("hidden");
    setTimeout(() => {
      rightWrong.classList.add("hidden");
    }, 1000);
  } else if (correct == false) {
    rightWrong.innerText = "Wrong!";
    rightWrong.classList.remove("hidden");
    setTimeout(() => {
      rightWrong.classList.add("hidden");
    }, 1000);
  }
}

function endGame() {
  clearInterval(intervalId);
  questionDiv.classList.add("hidden");
  initialDiv.classList.remove("hidden");
  yourScore.classList.remove("hidden");
}

initialBtn.addEventListener("click", function () {
  const playerInitial = {
    initial: initialInput.value,
    score: time,
  };
  highScoreList.push(playerInitial);
  localStorage.setItem("highscores", JSON.stringify(highScoreList));
  window.location.href = "https://aydenemateo.github.io/Code-Quiz/highscore.html";
});

startBtn.addEventListener("click", function () {
  intervalId = setInterval(timerFunction, 1000);
  startGame();
});