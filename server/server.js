const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Initialize our guesses array
let history = ['You are seeing the history'];

// GET & POST Routes go here

// GET
app.get( '/history', (req, res)  => {
  // console.log(`Request for guesses serverside ...  guesses);
  res.send( history );
});

// POST
app.post('/history', (req, res) => {
  let newInputs = req.body;
  // console.log('Checking format of newInputs', newInputs);
  guesses.push(newInputs);
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

    }


