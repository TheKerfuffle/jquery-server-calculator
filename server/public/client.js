$(handleReady);

function handleReady() {

    $('#plus').on('click', setPlusOperator);
    $('#minus').on('click', setMinusOperator);
    $('#multiply').on('click', setMultiplyOperator);
    $('#divide').on('click', setDivideOperator);

    $('#clear').on('click', function (event) {
        $('#number1').val('');
        $('#number2').val('');
    })

    $('#go').on('click', function (event) {
        // console.log('clicked go');
        sendValues();
    });

    getHistory();
}

let operator;

function setPlusOperator() {
    operator = '+';
}
function setMinusOperator() {
    operator = '-';
}
function setMultiplyOperator() {
    operator = '*';
}
function setDivideOperator() {
    operator = '/';
}



// function clearInputs() {
//   let resetInput = {
//     roundNumber: 0,
//     player1: 0,
//     player1correct: 2,
//     player2: 0,
//     player2correct: 2,
//   } 
//   $.ajax({
//     method: 'POST',
//     url: '/restart',
//     data: resetInput,
// })
//     .then(function (response) {
//       console.log('added guesses');
//       getGuesses();
//     })
//     .catch( function (error) {
//       console.log('error from server', error);
//       alert('sorry, could not get guesses. Try again later.');
//     })
//   $('#input1').val('');
//   $('#input2').val('');
// }

function sendValues() {
    if (operator === undefined) {
        alert('Please choose a Math operator ( + - * / )')
    } else {
        let newValues = {
            number1: $('#number1').val(),
            number2: $('#number2').val(),
            newOperator: operator,
            answer: 0
        }
      
        $.ajax({
            method: 'POST',
            url: '/history',
            data: newValues,
        })
        .then(function (response) {
            // console.log('added problem');
            getHistory();
        })
        .catch( function (error) {
            console.log('error from server', error);
            alert('sorry, could not get guesses. Try again later.');
        })
    }
}

function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/history'
    })
    .then(function (response) {
        // console.log('response from server', response);
        render(response);
    })
    .catch( function (error) {
        console.log('error from server', error);
        alert('sorry, could not get quotes. Try again later.');
    })
}

function render( processedInputs ) {
    $('#history').empty();
    $('#answer').text(processedInputs[processedInputs.length-1].answer);

    for (let question of processedInputs) {
        let string = `${question.number1} ${question.newOperator} ${question.number2} = ${question.answer}`
        $('#history').append(`<li>${string}</li>`);
    }
}