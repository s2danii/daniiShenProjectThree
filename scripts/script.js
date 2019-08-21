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


// cootieCatcher.smoothScroll = function () {
    $(`.catcherSquare`).on(`click`, function (event) {
        if(this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $(`html, body`).animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {
                window.location.hash = hash;
            });
        }
    });
// }

