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
  res.send( history );
});

// POST
app.post('/history', (req, res) => {
  let newInputs = req.body;
  // console.log('Checking format of newInputs', newInputs);
  history.push(newInputs);
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
        
    }
}


    // let newValues = {
    //     number1: $('#number1').val(),
    //     number2: $('#number2').val(),
    //     newOperator: operator,
    //     answer: 0
    // }