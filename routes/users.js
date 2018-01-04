var express = require('express');
var router = express.Router();
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.render('users/index', {
        users,
        pageTitle: 'Users'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/new', (req, res) => {
  res.render('users/new', { pageTitle: 'New User' })
})

router.post('/', (req, res) => {
  const newUser = req.body
  if(!newUser.photoUrl) {
    newUser.photoUrl = 'http://www.fillmurray.com/g/300/300'
  }

  User.create(newUser)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  User.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user,
        pageTitle: user.nickName
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId

  User.findById(userId)
    .then((user) => {
      res.render('users/edit', {
        user,
        pageTitle: 'Profile_Update'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.put('/:userId', (req, res) => {
  const userId = req.params.userId
  const updatedUserInfo = req.body

  User.findByIdAndUpdate(userId, updatedUserInfo, {new: false})
    .then(() => {
      res.redirect(`/users/${userId}`)
    })
})


router.get('/:userId/delete', (req, res) => {
  const userId = req.params.userId

  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})


module.exports = router;
