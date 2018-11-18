// create empty quiz object
const quizApp = {};

// document ready, initialize
$(function () {
    quizApp.init();
});

// run through functions
quizApp.init = function () {
    quizApp.formSubmit();
}

// set score and matching donuts
quizApp.donuts = [
    {
        donut: 'Original glazed',
        score: 4
    },
    {
        donut: 'Strawberry iced',
        score: 8
    },
    {
        donut: 'Chocolate iced',
        score: 12
    },
    {
        donut: 'Boston cream',
        score: 16
    },
    {
        donut: 'Chocolate iced with sprinkles',
        score: 20
    }
]

// on submit
quizApp.formSubmit = function(){
    $('form').on('submit', function(event) {
        // prevent default form action
        event.preventDefault();
        // check if all questions answered
        if ( $('input:checked').length < 4 ) {
            // remove content if any
            $('.results').empty();
            // post error on page if unanswered questions
            $('.results').append('<p class="icon"><i class="fas fa-exclamation-circle"></i></p><p class="message"><a href="#start" class="button">Please answer all questions!</a></p>');
            // show results container
            $(".results-container").css("display", "block");
            // hide results header
            $(".results-container h2").css("display", "none");
            // scroll to error message
            document.getElementById('results').scrollIntoView();
        }

        // retrieve checked values, convert to array, convert to numbers, add together for total points
        else {
            quizApp.points = $('input:checked').map(function () {
                return this.value;
            }).get().map(function (point) {
                return parseInt(point, 10)
            }).reduce(function (acc, curr) {
                return acc + curr;
            });
            // console.log(quizApp.points);
            quizApp.result();
            quizApp.postResult();
        }
    })
};

quizApp.result = function(){
    // compare quizApp.points to donut score, return donut
    for ( let i = 0; i < quizApp.donuts.length; i++ ) {
        if ( quizApp.points <= quizApp.donuts[i].score ) {
            quizApp.donut =  quizApp.donuts[i].donut;
            return
        }
    }
};

quizApp.postResult = function(){
    // remove content if any
    $('.results').empty();
    // post result on page
    $('.results').append(`<p class="donut-name">${quizApp.donut} donut!</p><p><a href="#start">This isn't me... try again.</a></p>`);
    // show results container and results heading
    $(".results-container").css("display", "block");
    $(".results-container h2").css("display", "block");
    // scroll to result
    document.getElementById('results').scrollIntoView();
};
