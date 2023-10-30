let timerInterval;
// Questions and Answers
const questions = [
    {
        question: "",
        options: [""],
        correct: ""
    },
    {
        question: "",
        options: [""],
        correct: ""
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
}







// Function to save the score to compare highscores
function saveScore() {
    const initials = prompt("Enter your initials:");
   
    alert(`Score saved for ${initials}: ${score}`);
}
