function updateQuestionUI(questionObj, handleAnswerSelection) {
    // Set the question text with decoded HTML entities
    document.getElementById("question").innerHTML = decodeHTMLEntities(questionObj.question);

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    // Combine incorrect and correct answers, then shuffle
    const answers = [...questionObj.incorrect_answers, questionObj.correct_answer];
    answers.sort(() => Math.random() - 0.5);

    // Create buttons for each answer
    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerText = decodeHTMLEntities(answer);
        btn.onclick = () => handleAnswerSelection(answer);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("feedback").innerText = ""; // Clear previous feedback
}

// Function to decode HTML entities properly
function decodeHTMLEntities(text) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, "text/html").body.innerText;
    return decodedString;
}

function showAnswerFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById("feedback");

    if (!feedback) {
        console.error("Feedback element not found!");
        return;
    }

    if (isCorrect) {
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = `❌ Wrong! Correct answer: ${correctAnswer}`;
        feedback.style.color = "red";
    }
}

function showEndScreen(score) {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
}

export { updateQuestionUI, showEndScreen, showAnswerFeedback };
