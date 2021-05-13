// Assignment
var score = 0;
var questionIndex = 0;
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 5;

var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#startQuiz");
var questionDiv = document.querySelector("#questionDiv");


$(timer).on("click", function () { //onclick event to start the timer, display the timer and display a message when the time is up. 
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

function renderQuestion(questionIndex) { // function to clear the page and render the questions in a list format
    $(questionDiv).html("");
    $(ulCreate).html("");
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionDiv.textContent = userQuestion; // I was unable to get the questions to be randomly chosen, so for now they just run through in order.
    }
    userChoices.forEach(function (newQ) {
        var listItem = document.createElement("li");
        listItem.textContent = newQ;
        $(questionDiv).append(ulCreate);
        $(ulCreate).append(listItem);
        listItem.addEventListener("click", (compareAnswer));
    })
}
function compareAnswer(event) { // function to compare the user answer to the correct answer
    console.log(event);
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div"); //assignment
        $(createDiv).attr("id", "createDiv"); //
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            $(createDiv).text("Correct! The answer is:  " + questions[questionIndex].answer); // createDiv for the message displayed after correct answer
        } else {
            secondsLeft = secondsLeft - penalty; // factoring in the time deduction
            $(createDiv).text("Incorrect! The correct answer is:  " + questions[questionIndex].answer); // createDiv for the incorrect answer message
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

    if (secondsLeft >= 0) { // If time left is less than or equal to 0 display the final score message and append it to questionDiv, also clear the time interval.
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