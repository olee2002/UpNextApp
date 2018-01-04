var express = require('express');
var router = express.Router();
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', (request, response) => {
  User.find({})
    .then((users) => {
      response.render('users/index', {
        users,
        pageTitle: 'Users'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/new', (request, response) => {
  response.render('users/new', { pageTitle: 'New User' })
})

router.post('/', (request, response) => {
  const newUser = request.body
  if(!newUser.photoUrl) {
    newUser.photoUrl = 'http://www.fillmurray.com/g/300/300'
  }

  User.create(newUser)
    .then(() => {
      response.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})




module.exports = router;
