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
        score: 4,
        description: `You're independent and reliable. Your friends and family can count on you. You enjoy the classics and sometimes miss the simple way things used to be. You definitely have a record player with old records lining your shelves. You have a good head on your shoulders, but sometimes you're averse to taking risks. Add some adventure to your life!`
    },
    {
        donut: 'Strawberry iced',
        score: 8,
        description: `You are creative and fun. You have the amazing ability to make friends wherever you go. You are kind and empathetic. Just remember to say no and avoid taking on more than you can handle. You have needs too!`
    },
    {
        donut: 'Chocolate iced',
        score: 12,
        description: `You're bold and trustworthy. Your friends can always count on you to honestly approve or veto their outfit or selfie. You're open to trying new things. Don't be afraid to get in touch with your emotions. Watch that rom-com, have that cry!`
    },
    {
        donut: 'Boston cream',
        score: 16,
        description: `You have so much to offer. You basically ooze charm and flavour. Your friends appreciate your ability to break the ice no matter the situation. Your sense of humour makes you an invaluable friend, but don't forget to prioritize yourself and experience your emotions to the fullest.`
    },
    {
        donut: 'Chocolate iced with sprinkles',
        score: 20,
        description: `Are you okay, babe? Just kidding, we approve of your adventurous, try-anything attitude towards life. You've always been one to ride the rollercoaster of life, never passing up an opportunity to coast straight to skyhigh euphoria. But don't forget to incorporate self-care into your routine so that the deep dives are less traumatic and more therapeutic.`
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
            quizApp.descriptions();
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

quizApp.descriptions = function () {
    // compare quizApp.points to donut score, return description of donut
    for (let i = 0; i < quizApp.donuts.length; i++) {
        if (quizApp.points <= quizApp.donuts[i].score) {
            quizApp.description = quizApp.donuts[i].description;
            return
        }
    }
};

quizApp.postResult = function(){
    // remove content if any
    $('.results').empty();
    // post result on page
    $('.results').append(`<p class="donut-name">${quizApp.donut} donut!</p><p class="donut description">${quizApp.description}</p><p class="icon"><a href="#end"><i class="fas fa-arrow-circle-down"></i></a></p>`);
    // remove try again content if any
    $('.try-again').empty();
    // add option to try again on page
    $('.try-again').append(`<p class="icon"><i class="fas fa-smile"></i></p><p class="try-again"><a href="#credits" class="button">Credits.</a></p><p class="icon"><i class="fas fa-sad-tear"></i></p><p class="try-again"><a href="#start" class="button">This isn't me... Try again.</a></p>`);
    // show results container, results heading and end section
    $(".results-container").css("display", "block");
    $(".results-container h2").css("display", "block");
    $(".end").css("display", "block");
    // scroll to results
    document.getElementById('results').scrollIntoView();
};
