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

cootieCatcher.finalAnswers = [`Not likely`, `Definitely`, `The future is in your hands`, `Hell yes!`, `The future is murky`, `Hundo p`, `Your heart tells you no`, `Ha ha. Good one.`];



// console.log(numberChoices.numberChoiceTwo);

// SMOOTH SCROLL FUNCTION DEFINED
cootieCatcher.smoothScroll = function (clickedElement) {
    $(clickedElement).on(`click`, function (event) {
        if(this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $(`html, body`).animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
};


cootieCatcher.forLoop = function (sectionToAppear, arraySelected) {
    for(let n = 0; n < 4; n++) {
        $(`li:nth-of-type(${n+1}) ${sectionToAppear}`).text(`${arraySelected[n]}`);
    };
};

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

cootieCatcher.bigReveal = function () {
    const cardIndex = Math.floor(Math.random() * 8);
    $(`.tabSquare`).on(`click`, function() {
        $(`.answerSection .wrapper`).html(`<h3 class="result">Your result: ${cootieCatcher.finalAnswers[cardIndex]} </h3>`);
    })
};






// INIT FUNCTION DEFINED
cootieCatcher.init = function () {
    cootieCatcher.smoothScroll(`.catcherSquare`);
    cootieCatcher.smoothScroll(`.startButton`);
    cootieCatcher.nextToShow(`.colorSquare`);
    cootieCatcher.nextToShow(`.numberSquare`);
    cootieCatcher.bigReveal();
}

$(document).ready(function() {
    cootieCatcher.init();
});




