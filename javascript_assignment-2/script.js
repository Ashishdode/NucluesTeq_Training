import { fetchQuestions } from "./api/fetchQuestions.js";
import { updateQuestionUI, showEndScreen, showAnswerFeedback } from "./js/ui.js";
import { checkAnswer, startTimer } from "./js/gameLogic.js";

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let answerSelected = false; //  Prevent multiple answer selections

document.getElementById("start-btn").addEventListener("click", async () => {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;

    questions = await fetchQuestions(category, difficulty);
    
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").innerText = score;
    
    loadNextQuestion();
});

function loadNextQuestion() {
    clearInterval(timer);
    answerSelected = false; //  Reset answer selection lock

    if (currentQuestionIndex >= questions.length) {
        showEndScreen(score);
        return;
    }

    const questionObj = questions[currentQuestionIndex];

    updateQuestionUI(questionObj, handleAnswerSelection);

    timer = startTimer(() => {
        if (!answerSelected) { //  Only show feedback if no answer was selected
            showAnswerFeedback(false, questionObj.correct_answer);
        }
        setTimeout(loadNextQuestion, 2000);
    });

    currentQuestionIndex++;
}

function handleAnswerSelection(selectedAnswer) {
    if (answerSelected) return; //  Prevent multiple clicks
    answerSelected = true; //  Lock further selections

    clearInterval(timer);

    const questionObj = questions[currentQuestionIndex - 1];
    const correctAnswer = questionObj.correct_answer;
    const isCorrect = checkAnswer(selectedAnswer, correctAnswer);

    if (isCorrect) {
        score++;
    }

    showAnswerFeedback(isCorrect, correctAnswer);
    document.getElementById("score").innerText = score;

    setTimeout(loadNextQuestion, 2000);
}

document.getElementById("restart-btn").addEventListener("click", () => {
    clearInterval(timer);
    location.reload();
});
