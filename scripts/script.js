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

cootieCatcher.finalAnswers = [`Not likely...`, `The stars will align for you ⭐`, `The future is in your hands.`, `Hell yes.`, `Mars is in retrograde so things don't look good.`, `Hundo p 💯`, `I'm sorry, but no.`, `Ha ha. Good one.`, `The future is murky, please try again.`];



// SMOOTH SCROLL FUNCTION DEFINED HERE
cootieCatcher.smoothScroll = function (clickedElement) {
    $(clickedElement).on(`click`, function (event) {
        if(this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $(`html, body`).animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
};

// FUNCTION TO PRINT ARRAY ONTO SQUARES IN HTML DEFINED HERE
cootieCatcher.forLoop = function (sectionToAppear, arraySelected) {
    arraySelected.forEach(function (arrayItem, arrayIndex) {
        $(`li:nth-of-type(${arrayIndex + 1}) ${sectionToAppear}`).text(`${arrayItem}`);
    });
};


// FUNCTION TO DECIDE THE ARRAY TO POPULATE THE NEXT SECTION DEFINED HERE
cootieCatcher.nextToShow = function (sectionSquare) {
    $(sectionSquare).on(`click`, function() {
        let selectedSquare = ``;
        let questionSection = ``;
        let nextSection = ``;
        
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

        if (selectedSquare === `odd`) {
            let setDisplayed = questionSection[0];
            cootieCatcher.forLoop(nextSection, setDisplayed);
        } else {
            let setDisplayed = questionSection[1];
            cootieCatcher.forLoop(nextSection, setDisplayed);
        };
        
    })
};

// FUNCTION TO PRINT FINAL ANSWER ON ANSWER CARD DEFINED HERE
cootieCatcher.bigReveal = function () {
    $(`.tabSquare`).on(`click`, function() {
        let cardIndex = Math.floor(Math.random() * 9);
        console.log(cardIndex);
        $(`.resultsAnswer`).html(`${cootieCatcher.finalAnswers[cardIndex]}`);
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
        });
    }
)};





// INIT FUNCTION DEFINED HERE
cootieCatcher.init = function () {
    cootieCatcher.smoothScroll(`.catcherSquare`);
    cootieCatcher.smoothScroll(`.startButton`);
    cootieCatcher.nextToShow(`.colorSquare`);
    cootieCatcher.nextToShow(`.numberSquare`);
    cootieCatcher.bigReveal();
    // cootieCatcher.smoothScroll(`.restartButton`);
    cootieCatcher.restart();
    
}

$(document).ready(function() {
    cootieCatcher.init();
});
