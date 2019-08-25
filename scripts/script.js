const cootieCatcher = {};

cootieCatcher.colorChoices = [`green`, `blue`, `red`, `yellow`];

cootieCatcher.numberChoices = [
    [3, 5, 8, 10],
    [4, 7, 11, 14]
]

cootieCatcher.tabChoices = [
    [`A`, `B`, `C`, `D`],
    [`E`, `F`, `G`, `H`]
]

cootieCatcher.finalAnswers = [`Not likely...🙄`, `The stars will align for you ⭐`, `The future is in your hands 👐`, `🔥 Hell yes 🔥`, `Mars is in retrograde so things don't look good.`, `Hundo p 💯`, `I'm sorry, but no.😬`, `Ha ha. Good one.`, `The future is murky, please try again. 🤔`, `Without a doubt - yes! 🎉`];


// FUNCTION TO PRINT ARRAY ONTO SQUARES IN HTML DEFINED HERE
cootieCatcher.printArray = function (sectionToAppear, arraySelected) {
    arraySelected.forEach(function (arrayItem, arrayIndex) {
        $(`li:nth-of-type(${arrayIndex + 1}) ${sectionToAppear}`).text(`${arrayItem}`);
    });
};

// FUNCTION TO DECIDE THE ARRAY TO POPULATE THE NEXT SECTION DEFINED HERE
cootieCatcher.nextToShow = function (sectionSquare) {
    $(sectionSquare).on(`click`, function() {
        // square that is clicked by user
        let selectedSquare = ``;
        // the array that will populate the next question section
        let questionSection = ``;
        // the upcoming section that needs to be populated
        let nextSection = ``;
        // To determine the array to display in the next set of questions for colour choice and number choice
        if (sectionSquare === `.colorSquare`) {
            selectedSquare = $(this).children(`div`).attr(`class`);
            questionSection = cootieCatcher.numberChoices;
            nextSection = `.numberSquare`;
        } else if (sectionSquare === `.numberSquare`) {
            questionSection = cootieCatcher.tabChoices;
            nextSection = `.tabSquare`;
            if ($(this).text() % 2) {
                selectedSquare = `even`;
            }
            else {
                selectedSquare = `odd`;
            }
        };
        // user chooses either an odd or even number/colour (colour has odd or even # of letters). Based on odd or even, this determines the item to print from the array
        if (selectedSquare === `odd`) {
            let setDisplayed = questionSection[0];
            cootieCatcher.printArray(nextSection, setDisplayed);
        } else {
            let setDisplayed = questionSection[1];
            cootieCatcher.printArray(nextSection, setDisplayed);
        };
        
    })
};

// FUNCTION TO PRINT FINAL ANSWER ON ANSWER CARD DEFINED HERE
cootieCatcher.bigReveal = function () {
    $(`.tabSquare`).on(`click`, function() {
        let cardIndex = Math.floor(Math.random() * 10);
        $(`.resultsAnswer`).html(`"${cootieCatcher.finalAnswers[cardIndex]}"`);
    });
};

// RESTART FUNCTION DEFINED HERE
cootieCatcher.restart = function () {
    $(`.restartButton`).on(`click`, function(event) {
        event.preventDefault();
        $(`html, body`).animate({
            scrollTop: $(`#startSection`).offset().top
        }, 1000, function () {
                location.hash = ``;
                location.reload();
                $(`:text`).val(``);
        });
    }
)};

// CARD FLIP MAGIC DEFINED HERE
cootieCatcher.flipSquares = function(sectiontoFlip) {
        $(`${sectiontoFlip} .card`).addClass(`isFlipped`);

};

// SMOOTH SCROLL FUNCTION DEFINED HERE
cootieCatcher.smoothScroll = function (clickedElement) {
    $(clickedElement).on(`click`, function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            const locationHash = this.hash;
            $(`html`).animate({
                scrollTop: $(locationHash).offset().top
            }, 800, `swing`, function () {
                window.location.hash = locationHash;
                cootieCatcher.flipSquares(locationHash);
            });
        }
    });
};

// FUNCTION TO STORE USER INPUT AND PRINT AT THE END
cootieCatcher.startGame = function () {
    $(`form`).on(`submit`, function (event) {
        event.preventDefault();
        const locationHash = $(`:submit`).data(`hash`);
        let userQuestion = $(`textarea`).val();
        // console.log(userQuestion);
        // console.log(locationHash);
        $(`html`).animate({
            scrollTop: $(locationHash).offset().top
        }, 800, `swing`, function () {
            window.location.hash = locationHash;
            cootieCatcher.printQuestion(userQuestion);
        });
    }
)};

// FUNCTION TO PRINT USER QUESTION
cootieCatcher.printQuestion = function (userQuestion) {
    if (userQuestion !== ``) {
        $(`.userQuestion`).html(`"${userQuestion}"`);
    };
};


// REFRESH FUNCTION TO CLEAR OUT HASH DEFINED HERE
cootieCatcher.clearHash = function () {
    $(window).unload(function () {
        window.location.hash = ``;
    });
}



// INIT FUNCTION DEFINED HERE
cootieCatcher.init = function () {
    cootieCatcher.smoothScroll(`.catcherSquare`);
    cootieCatcher.smoothScroll(`.startButtonMobile`);
    cootieCatcher.startGame();
    cootieCatcher.nextToShow(`.colorSquare`);
    cootieCatcher.nextToShow(`.numberSquare`);
    cootieCatcher.bigReveal();
    cootieCatcher.smoothScroll(`.restartButton`);
    cootieCatcher.restart();
    cootieCatcher.clearHash();
}

// DOCUMENT READY

$(document).ready(function() {
    cootieCatcher.init();
    
});
