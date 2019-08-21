const cootieCatcher = {};

cootieCatcher.colorChoices = [`green`, `blue`, `red`, `yellow`];

cootieCatcher.numberChoices = {
    numberChoiceOne: [3, 5, 8, 10],
    numberChoiceTwo: [4, 7, 11, 14]
};

cootieCatcher.finalAnswers = {
    answerSetOne: [`Not likely`, `Definitely`, `The future is in your hands`, `Hell yes!`],
    answerSetTwo: [`The future is murky`, `Hundo p`, `Your heart tells you no`, `Ha ha. Good one.`]
}

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

cootieCatcher.forLoop = function (arraySelected) {
    for(let n = 0; n < 4; n++) {
        $(`li:nth-of-type(${n+1}) .numberSquare`).text(`${arraySelected[n]}`);
    };
};

cootieCatcher.nextToShow = function (section) {
    $(section).on(`click`, function() {
        let selectedSquare = $(this).children(`div`).attr(`class`);
        if (selectedSquare === `odd`) {
            let numbersDisplayed = cootieCatcher.numberChoices.numberChoiceOne;
            cootieCatcher.forLoop(numbersDisplayed);
        } else {
            let numbersDisplayed = cootieCatcher.numberChoices.numberChoiceTwo;
            cootieCatcher.forLoop(numbersDisplayed);
        };
        
    })
};

cootieCatcher.numberPick = function () {
    
}



// INIT FUNCTION DEFINED
cootieCatcher.init = function () {
    cootieCatcher.smoothScroll(`.catcherSquare`);
    cootieCatcher.smoothScroll(`.startButton`);
    cootieCatcher.nextToShow(`.colorSquare`);
}

$(document).ready(function() {
    cootieCatcher.init();
});




