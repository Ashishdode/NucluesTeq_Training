function checkAnswer(selected, correct) {
    return selected === correct;
}

function startTimer(callback) {
    let timeLeft = 15;
    const timerElement = document.getElementById("timer");

    const timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            callback();
        }
    }, 1000);

    return timer;
}

export { checkAnswer, startTimer };
