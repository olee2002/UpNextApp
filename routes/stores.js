const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../db/models/User')

router.get('/', (req, res) => {
    const userId = req.params.userId

    User.findById(userId)
        .then((user) => {
            res.render('stores/index', {
                nickName: user.nickName,
                userId: user._id,
                stores: user.stores,
                pageTitle: 'Stores'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})
router.get('/new', (request, response) => {
    const userId = request.params.userId

    response.render('stores/new', {
        userId
    })
})

router.get('/:storeId', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            response.render('stores/show', {
                userId,
                store
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/', (request, response) => {
    const userId = request.params.userId
    const newStore = request.body

    User.findById(userId)
        .then((user) => {
            user.stores.push(newStore)
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/stores`)
        })
        .catch((error) => {
            console.log(error)
        })

})

router.get('/:storeId/delete', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    User.findById(userId)
        .then((user) => {
            user.stores.id(storeId).remove()
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/stores/`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router