var index = 0
var startbtn = document.querySelector("#start")
var quizDiv = document.querySelector(".quiz")
var scoresDiv = document.querySelector(".scores")
var timerEl = document.getElementById("time")
var timeleft = 60

function tick() {
    timeleft--
    if (timeleft <= 0) {
        timeleft = 0
        endgame()
    }
    timerEl.textContent = timeleft
}
function startgame() {
    setInterval(tick, 1000)
    var startDiv = document.querySelector(".begin")
    startDiv.classList.add("hide")
    quizDiv.classList.remove("hide")
    askquestion()
}

function askquestion() {
    document.getElementById("choices").innerHTML = ""
    var quizEl = document.getElementById("questionTitle")
    quizEl.textContent = questions[index].title
    questions[index].choices.forEach(function (choice) {
        var btn = document.createElement("button")
        btn.textContent = choice;
        btn.setAttribute("value", choice)
        btn.addEventListener("click", function () {
            if (this.value === questions[index].answer) {
                console.log("correct")
            }
            else {
                console.log("incorrect")
                incorrect()
            }
            index++;
            if (index === questions.length) {
                console.log("endgame")
                quizDiv.classList.add("hide")
                timeleft = 0
                endgame()
            }
            else {
                askquestion()
            }
        })
        document.getElementById("choices").appendChild(btn)
    })
}

function incorrect() {
    timeleft -= 10;
}

function endgame() {
    scoresDiv.classList.remove("hide")
    console.log("special")
}

function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== '') {
        var highscores =
            JSON.parse(window.localStorage.getItem('highscores')) || [];
    }
    var newScore = {
        score: time,
        initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
}


startbtn.addEventListener("click", startgame)