let timerInterval;


// Questions and Answers
const questions = [
    {
        question: "Is JavaScript the same as Java",
        options: ["Yes","No"],
        correct: "No"
    },
    {
        question: "The condition in an if / else statement is enclosed in ____",
        options: ["Quotes","Curly Brackets","Parentheses","Square Brackets"],
        correct: "Parentheses"
    },
    {
        question: "Commonly used data types do not include: ",
        options: ["Strings","Booleans","Alerts","Numbers"],
        correct: "Alerts"
    },
    {
        question: "Arrays in JavaScript can be used to store _______",
        options: ["Numbers and Strings","Other Arrays","Booleans","All of the Above"],
        correct: "All of the Above"
    },
    {
        question: "A very useful used during development and debugging for printing to the debugger is: ",
        options: ["JavaScript","Terminal / Bash","For Loops","Console.Log"],
        correct: "Console.Log"
    },

];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60; // Start Time

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const startButton = document.getElementById("startButton");
const submitButton = document.getElementById("submitButton");
const timeLeftElement = document.getElementById("timeLeft");

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = "none";
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        optionsElement.innerHTML = "";

        for (const option of questions[currentQuestion].options) {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", checkAnswer);
            optionsElement.appendChild(button);
        }
    } else {
        endGame();
    }
}

function checkAnswer(event) {
    if (event.target.textContent === questions[currentQuestion].correct) {
        score++;
    } else {
        timeLeft -= 5; // Subtracts time for incorrect answer
    }

    currentQuestion++;
    displayQuestion();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeftElement.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval); // Clears remaining time
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval); // Clears the timer 
    questionElement.textContent = "Game Over!";
    optionsElement.innerHTML = "";
    submitButton.style.display = "block";
    submitButton.addEventListener("click", saveScore);
    restartButton.style.display = "block";
}


const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", restartGame);

function restartGame() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    displayQuestion(); // Should show the first question again 
    startTimer(); // Restarts the timer
    restartButton.style.display = "none";
    submitButton.style.display = "none";
}

const highScores = [];



// This saves your score
function saveScore() {
    const initials = prompt("Enter your initials:");
    const scoreData = `${initials}: ${score}`;
    highScores.push(scoreData);

    // Sorts the scores 
    highScores.sort((a, b) => b.score - a.score);

    // keeps top 5 scores
    highScores.splice(5);

    localStorage.setItem("highScores", highScores.join(",")); // Stores the scores as a string
    displayHighScores();
}

function displayHighScores() {
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";

    if (localStorage.getItem("highScores")) {
        const scoresString = localStorage.getItem("highScores");
        const scoresArray = scoresString.split(",");

        // Convert the scores
        const scoresObjects = scoresArray.map((scoreEntry) => {
            const [initials, score] = scoreEntry.split(": ");
            return { initials, score: parseInt(score) };
        });

        // Sort the scores 
        scoresObjects.sort((a, b) => b.score - a.score);

        scoresObjects.forEach((scoreEntry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
            scoreList.appendChild(listItem);
        });
    }
}

window.onload = function () {
    displayHighScores(); // To load and display Highscores
};