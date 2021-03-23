const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
// Security:
app.use(express.json({
  limit: '500b'
}));
app.use(helmet());
const requestsLimit = rateLimit({
  windowMs: 1000 * 60 * 60,
  max: 10
})
app.use(requestsLimit);
// Storage Constants:
let registeredUsersArray = [
  {
    username: "Rassaster",
    name: "Juan Manuel",
    lastname: "Rassa Sterling",
    email: "jmrassa@gmail.com",
    age: 27,
    password: "231d"
  }
];

// Middlewares
// Validation functions
const Middlewares = {
  validateInput_notUndefined: function(req, res, next){},
  validateInput_notEmpty: function(req, res, next){},
  validateInput_isString: function(req, res, next){},
  validateInput_isNum: function(req, res, next){},
  validateInput_validUser: function(req, res, next){},
  validateInput_validEmail: function(req, res, next){},
  validateInput_validPassword: function(req, res, next){}
}
// Endpoints
app.get('/bbTestServer', (req, res) => {
  res.send('Breathing and Beating here! Current time and date: ' + new Date().toLocaleString());
})

app.post('/register', (req, res)=>{
  let newUserRegister = {
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password
  }
  registeredUsersArray.push(newUserRegister);
  console.log(registeredUsersArray);
  res.status(201).send('New user successfully registered: ' + ' ' +  registeredUsersArray.length);
})

app.post('/login', (req, res)=>{
  let loginRequest = {
    username: req.body.username,
    password: req.body.password
  }
  const findUser = registeredUsersArray.find(user => user.username === loginRequest.username);
  if (findUser !== undefined) {
    console.log('User exists');
    if (findUser.password === loginRequest.password){
      console.log(new Date() + ' User LOGGED');
      let message = 'The user has logged in successfully.';
      res.status(200).json({Message: message});
    } else {
      console.log('Invalid password.')
      let message = 'Invalid password for the username account.';
      res.status(401).send(message);
    }
  } else {
    console.log('User does not exists.')
    let message = "The user don't exists.";
    res.status(400).send(message)
  }
})

// Designating a local port to the server:
app.listen(3000, ()=>{
  console.log('Welcome to this humble lines! You are at the Local Host Port 3000.')
})