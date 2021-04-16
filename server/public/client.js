$(handleReady);

function handleReady() {

    $('#plus').on('click', setPlusOperator);
    $('#minus').on('click', setMinusOperator);
    $('#multiply').on('click', setMultiplyOperator);
    $('#divide').on('click', setDivideOperator);

  $('#go').on('click', function (event) {
      // console.log('clicked go');
      sendValues();
  });
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
      console.log('added guesses');
      getHistory();
    })
    .catch( function (error) {
      console.log('error from server', error);
      alert('sorry, could not get guesses. Try again later.');
    })


}

function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/history'
    })
    .then(function (response) {
        console.log('respone from server', response);
        render(response);
    })
    .catch( function (error) {
        console.log('error from server', error);
        alert('sorry, could not get quotes. Try again later.');
    })
    console.log('After making server request...');
}

function render( processedInputs ) {


//   console.log(checkedguesses);
  
//   $("#round-total").text(`${checkedguesses.length}`);
//   $('#total-guesses').empty();
//   let string = '';
//     for (let guess of checkedguesses){
//       console.log(`${guess.player1}, ${guess.player2}`);
//       if (guess.player1correct === 1) {
//         string = `<p>Player 1: ${guess.player1} , Too high!</p>`;
//       } else if (guess.player1correct === -1) {
//         string = `<p>Player 1: ${guess.player1} , Too low!</p>`;
//       } else {
//         string = `<p class="correct">Player 1: ${guess.player1} , Right on!</p> <button id="restart-button">Restart</button>`;
//       }

//       if (guess.player2correct === 1) {
//         string += `<p>Player 2: ${guess.player2} , Too high!</p>`;
//       } else if (guess.player2correct === -1) {
//         string += `<p>Player 2: ${guess.player2} , Too low!</p>`;
//       } else {
//         string += `<p class="correct">Player 2: ${guess.player2} , Right on!</p> <button id="restart-button">Restart</button>`;
//       }

//       $('#total-guesses').append(string);
//     }
}