// create empty quiz object
const quizApp = {};

// document ready, initialize
$(function () {
    quizApp.init();
});

// run through functions
quizApp.init = function () {
    quizApp.smoothScroll();
    quizApp.formSubmit();
    quizApp.tryAgain();
}

// set score and matching donuts
quizApp.donuts = [
    {
        donut: 'original-glazed',
        score: 4
    },
    {
        donut: 'strawberry-iced',
        score: 8
    },
    {
        donut: 'chocolate-iced',
        score: 12
    },
    {
        donut: 'boston-cream',
        score: 16
    },
    {
        donut: 'chocolate-iced-with-sprinkles',
        score: 20
    }
]

// smooth scroll links
quizApp.smoothScroll = function(){
    $(document).on('click', 'a[href^="#"]', function (event) {
        // prevent default link behaviour
        event.preventDefault();
        // scroll to destination
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
};

// on submit
quizApp.formSubmit = function(){
    $('form').on('submit', function(event) {
        // prevent default form action
        event.preventDefault();
        // check if all questions answered
        if ( $('input:checked').length < 4 ) {
            // sweet alert
            swal("Error", "Please answer all questions!", "error");
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
    // hide previous result, if any
    $(".original-glazed").addClass("hide");
    $(".strawberry-iced").addClass("hide");
    $(".chocolate-iced").addClass("hide");
    $(".boston-cream").addClass("hide");
    $(".chocolate-iced-with-sprinkles").addClass("hide");
    // show result
    $(`.${quizApp.donut}`).removeClass("hide");
    // show results container
    $(".results-container").removeClass("hide");
    // smooth scroll to results
    $('html, body').animate({
        scrollTop: $("#results").offset().top
    }, 500);
};

// on try again
quizApp.tryAgain = function () {
    $('.try-again').on('click', function (event) {
        // prevent default link behaviour
        event.preventDefault();
        // clear results
        $(".results-container").addClass("hide");
        // uncheck all answers
        $('input:radio').each(function(){
            $(this).attr('checked', false);
        });
        // smooth scroll to start
        $('html, body').animate({
            scrollTop: $("#start").offset().top
        }, 500);
    });
};
