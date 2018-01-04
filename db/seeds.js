require('dotenv').config()
const User = require('./models/User')
// const Store = require('./models/Store')
// const Gift = require('./models/Gift')
const mongoose = require('mongoose')

// connect to database
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
    process.exit(-1)
})

// Delete all users, then add some fake ones
User.remove({})
    .then(() => {
        const olee = new User({
            username: 'olee',
            email: 'olee@test.com',
            firstName: 'Okhyun',
            lastName: 'Lee',
            photoUrl: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/p/7/000/1ea/270/09d189f.jpg'
        })

        return olee.save()

    })
    .catch((error) => {
        console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
        console.log(error)
    }).then(() => {
        mongoose.connection.close()
        console.log(`
        Finished seeding database...
        
        Disconnected from MongoDB
      `)
    })