// Assignment
var score = 0;
var questionIndex = 0;
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 5;

var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#startQuiz");
var questionDiv = document.querySelector("#questionDiv");
var container = document.querySelector("#container");


$(timer).on("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            $(timeLeft).text("Time: " + secondsLeft);

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                timesUp();
                $(timeLeft).text("Time's up!");
            }
        }, 1000);
    }
    renderQuestion(questionIndex);
});

var ulCreate = document.createElement("ul");

function renderQuestion(questionIndex) {
    $(questionDiv).html("");
    $(ulCreate).html("");
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newQ) {
        var listItem = document.createElement("li");
        listItem.textContent = newQ;
        $(questionDiv).append(ulCreate);
        $(ulCreate).append(listItem);
        listItem.addEventListener("click", (compareAnswer));
    })
}
function compareAnswer(event) {
    console.log(event);
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        $(createDiv).attr("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            $(createDiv).text("Correct! The answer is:  " + questions[questionIndex].answer);
        } else {
            secondsLeft = secondsLeft - penalty;
            $(createDiv).text("Incorrect! The correct answer is:  " + questions[questionIndex].answer);
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        timesUp();
        $(createDiv).text("Time's up!" + " " + "You answered  " + score + "/" + questions.length + " correctly.");
    } else {
        renderQuestion(questionIndex);
    }
    questionDiv.appendChild(createDiv);

}
function timesUp() {  
    console.log(timesUp)  
    $(questionDiv).html("");
    $(timeLeft).html("");

    var createH1 = document.createElement("h1");
    $(createH1).attr("id", "createH1");
    $(createH1).text("Time is up!");

    $(questionDiv).append(createH1);

    var createP = document.createElement("p");
    $(createP).attr("id", "createP");

    questionDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        $(createP).text("Final Score: " + timeRemaining);
        $(questionDiv).append(createP2);
    }

    var createLabel = document.createElement("label");
    $(createLabel).attr("id", "createLabel");
    $(createLabel).text("Enter your initials: ");

    var createInput = document.createElement("input");
    $(createInput).attr("type", "text");
    $(createInput).attr("id", "initials");
    $(createInput).text("");

    var createSubmit = document.createElement("button");
    $(createSubmit).attr("type", "submit");
    $(createSubmit).attr("id", "Submit");
    $(createSubmit).text("Submit");

    $(questionDiv).append(createLabel);
    $(questionDiv).append(createInput);
    $(questionDiv).append(createSubmit);
}