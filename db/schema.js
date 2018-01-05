const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true, 
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        waitTime: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: {},
        usePushEach: true
    })

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: true, 
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String,
            default: 'https://cdn.vectorstock.com/i/thumb-large/66/69/santa-hat-vector-296669.jpg'
        },
        items: [ItemSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

const UserSchema = new Schema(
    {
        nickName: {
            type: String,
            required: [true, 'Username is required!']
        },
        email: {
            type: String
        },
        firstName: {
            type: String,
            required: [true, 'First name is required!']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required!']
        },
        photoUrl: {
            type: String,
            default: 'https://cdn.vectorstock.com/i/thumb-large/66/69/santa-hat-vector-296669.jpg'
        },
        stores: [StoreSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    UserSchema,
    StoreSchema,
    ItemSchema

}