const express = require('express')
const router = express.Router({ mergeParams: true })
const moment = require('moment')
const timer = require('moment-timer')

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
            const waitTime = item.waitTime
            const orderTime = moment(item.createdAt).format("HH:mm (dddd, MMMM Do YYYY)")
            const pickUpTime = moment(item.createdAt).add(waitTime,'m').format("HH:mm")
            response.render('items/show', {
                userId,
                store,
                item,
                waitTime,
                orderTime,
                pickUpTime
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