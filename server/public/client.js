$(onReady);

function onReady() {
    // Commented out for stretch goals
    // $('#plus').on('click', setPlusOperator);
    // $('#minus').on('click', setMinusOperator);
    // $('#multiply').on('click', setMultiplyOperator);
    // $('#divide').on('click', setDivideOperator);

    $('#clear').on('click', function (event) {
        // $('#number2').val('');
        // operator = undefined;

        $('#math-here').val('');
    })

    
    $('#go').on('click', function (event) {
        // console.log('clicked go');
        sendValues();
        $('#math-here').val('');
    });
    
    // If we refresh the page, we still want the history to appear in the DOM
    getHistory();
    
    // Numbers/operators/dot to append to math equation string that will go to the server
    // More comfortable view of these statements
    $('#num1').on('click', function (event) {
        // Much like num += 1, this sets the value of the input field
        // equal to itself and concatenates the new value to the string
        $('#math-here').val($('#math-here').val()+'1');
    });

    $('#num2').on('click', function (event) {$('#math-here').val($('#math-here').val()+'2');});
    $('#num3').on('click', function (event) {$('#math-here').val($('#math-here').val()+'3');});
    $('#num4').on('click', function (event) {$('#math-here').val($('#math-here').val()+'4');});
    $('#num5').on('click', function (event) {$('#math-here').val($('#math-here').val()+'5');});
    $('#num6').on('click', function (event) {$('#math-here').val($('#math-here').val()+'6');});
    $('#num7').on('click', function (event) {$('#math-here').val($('#math-here').val()+'7');});
    $('#num8').on('click', function (event) {$('#math-here').val($('#math-here').val()+'8');});
    $('#num9').on('click', function (event) {$('#math-here').val($('#math-here').val()+'9');});
    $('#num0').on('click', function (event) {$('#math-here').val($('#math-here').val()+'0');});
    // Special case of the decimal place
    $('#dot').on('click', function (event) {$('#math-here').val($('#math-here').val()+'.');});
    // Math operators
    $('#plus').on('click', function (event) {$('#math-here').val($('#math-here').val()+'+');});
    $('#minus').on('click', function (event) {$('#math-here').val($('#math-here').val()+'-');});
    $('#multiply').on('click', function (event) {$('#math-here').val($('#math-here').val()+'*');});
    $('#divide').on('click', function (event) {$('#math-here').val($('#math-here').val()+'/');});

    // $('#input-fields').on('click', function (event) {
    //     $('#num1').on('click', $('#math-here').append('1'))
    // })

}

// Commented out for the stretch goals
// let operator;
// function setPlusOperator() {
//     operator = '+';
// }
// function setMinusOperator() {
//     operator = '-';
// }
// function setMultiplyOperator() {
//     operator = '*';
// }
// function setDivideOperator() {
//     operator = '/';
// }



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
    
    // We are really only sending a math expression to the server
    // we initialize other variables in the object in order to st
    let newValues = {
        mathExpression: $('#math-here').val(),
        number1: 0,
        number2: 0,
        mathOperator: '',
        answer: 0
    }

    // If the first digit is a math operator, we deny the format of the expression
    if (newValues.mathExpression[0] === '+' ||
            newValues.mathExpression[0] === '*' || 
            newValues.mathExpression[0] === '/' || 
            newValues.mathExpression[0] === '-') {
        alert('Must input a number first, then an operator, then another number')
    }   

    // Special case, the first number inputted is negative, 
    // need to check for the rest of the expression before we send this input
    // 
//      I have this commented out because I ran out of time to support negative numbers
    // 
    // else if (newValues.mathExpression[0] === '-') {
    //     parseInputs(newValues);
    // }

    else {
        formatInputValues(newValues);
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

// Take data from the /history path and write it to the DOM
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
        alert('sorry, could not get math history. Try again later.');
    })
}


// Write values to the DOM in the format required.
function render( processedInputs ) {
    $('#history').empty();
    $('#answer').text(processedInputs[processedInputs.length-1].answer);

    for (let question of processedInputs) {
        let string = `${question.mathExpression} = ${question.answer}`
        $('#history').append(`<li>${string}</li>`);
    }
}


// Takes in an object with a string type math expression
// and formats it into 2 values and a math operator
function formatInputValues(input) {
    
    // Initialize variables
    let operator = '';
    let str = input.mathExpression;
    let num1 = parseFloat(str);
    let num2 = '';

    // Grab the math operator
    for (let letter of str) {
        if (letter === '+' || letter === '-' || letter === '*' || letter === '/' ) {
            operator = letter;
        }
    }
    
    // Loop through string after math operator to get second number value
    for (let i = str.indexOf(operator)+1; i<str.length; i++) {
        num2+=str[i];
    }

    // repopulate our object with variables
    input.number1 = Number(num1);
    input.number2 = Number(num2);
    input.mathOperator = operator;
    input.mathExpression = `${num1} ${operator} ${num2}`;

    return input;
}