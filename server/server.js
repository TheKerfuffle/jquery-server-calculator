const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Initialize our storage array
let history = [];

// GET
app.get( '/history', (req, res)  => {
  // console.log(`Request for guesses serverside ...  guesses);
  // Trying to keep an alert from popping up at us
  // when we reload a page with an empty history array
  if ( history.length === 0 ) {
    console.log('Add inputs to get history');
  } else {
    res.send( history );
  }
});

// POST
app.post('/history', (req, res) => {
  let newInputs = req.body;
  // console.log('Checking format of newInputs', newInputs);
  history.push(newInputs);
  getMath();
  doMath();
  res.sendStatus(201);
})

// app.post('/restart', (req, res) => {
//   guesses = [];
//   randomNum = randomNumber();
//   console.log('Reinitializing guesses');
//   res.sendStatus(201);
// })


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})



function doMath() {
    for (let problem of history) {
        let num1 = problem.number1;
        let num2 = problem.number2;
  
        switch (problem.mathOperator) {
            case '+':
                problem.answer = num1 + num2;
                break;
            
            case '-':
                problem.answer = num1 - num2;
                break;
            
            case '*':
                problem.answer = num1 * num2;
                break;
  
            case '/':
                problem.answer = num1 / num2;
                break;
        }
    }
}

  function getMath() {
    let operator = '';

    for (let problem of history) {
        let str = problem.mathExpression;
        let num1 = parseFloat(str);
        let num2 = '';
  
        for (let letter of str) {
            if (letter === '+' || letter === '-' || letter === '*' || letter === '/' ) {
                operator = letter;
            }
        }
        
    
        for (let i = str.indexOf(operator)+1; i<str.length; i++) {
            num2+=str[i];
        }

        // repopulate our object with variables
        problem.number1 = Number(num1);
        problem.number2 = Number(num2);
        problem.mathOperator = operator;
        problem.mathExpression = `${num1} ${operator} ${num2}`;
    }
}


//   let newValues = {
//     mathExpression: $('#math-here').val(),
//     number1: 0,
//     number2: 0,
//     mathOperator: '',
//     answer: 0
//   }