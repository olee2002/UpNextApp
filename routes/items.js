const express = require('express')
const router = express.Router({ mergeParams: true })
var moment = require('moment');

const User = require('../db/models/User')
const Store = require('../db/models/Store')



router.get('/new', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    console.log("Querying for userId", userId)
    console.log("Querying for storeId", storeId)

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
            const time = moment(item.createdAt).add(3,'days').format("dddd, MMMM Do YYYY");

            response.render('items/show', {
                userId,
                store,
                item,
                time
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:itemId/delete', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId
    const itemId = request.params.itemId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            store.items.id(itemId).remove()

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/stores/${storeId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router