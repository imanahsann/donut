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
        donut: 'an Original Glazed',
        score: 4
    },
    {
        donut: 'a Strawberry Iced',
        score: 8
    },
    {
        donut: 'a Chocolate Iced',
        score: 12
    },
    {
        donut: 'a Boston Cream',
        score: 16
    },
    {
        donut: 'a Chocolate Iced with Sprinkles',
        score: 20
    }
]

// on submit
quizApp.formSubmit = function(){
    $('form').on('submit', function(event) {
        // prevent default form action
        event.preventDefault();
        // check if all questions answered, post error on page if not
        if ( $('input:checked').length < 4 ) {
            $('.results').append('<div class="wrapper"><p><a href="#start">Please answer all questions!</a></p></div>');
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
    // remove error message if any
    $('.results').empty();
    // post result on page
    $('.results').append(`<div class="wrapper"><p>You are ${quizApp.donut} donut!</p></div>`);
    // scroll to result
    document.getElementById('results').scrollIntoView();
};
