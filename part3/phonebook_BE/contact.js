const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to,', url)

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log('connecting to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{3}-\d+$/.test(v) || /^\d{2}-\d+$/.test(v)
      },
      message: (props) => `${props.value} is not a valid number`,
    },
    required: [true, 'User phone number required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
