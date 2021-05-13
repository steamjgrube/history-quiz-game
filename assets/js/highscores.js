var highScore = document.querySelector("#highScore");
var clearBtn = document.querySelector("#clearBtn");
var backBtn = document.querySelector("#backBtn");

//Onclick event to clear localstorage and reload page
$(clearBtn).on("click", function () {
    localStorage.clear();
    location.reload();
});
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);


//Added an onclick event to bring it back to index
$(backBtn).on("click", function () {
    window.location.replace("/.index.html");
});