const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../db/models/User')
const Store = require('../db/models/Store')

router.get('/new', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)

            response.render('items/new', {
                userId,
                store,
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    const newFood = request.body

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            store.items.push(newFood)

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/stores/${storeId}`)
        })
})

router.get('/:itemId', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId
    const itemId = request.params.itemId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            const item = store.items.id(itemId)

            response.render('items/show', {
                userId,
                store,
                item,
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router