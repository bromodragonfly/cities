import express from 'express'
import cors from 'cors'
import fs from 'fs'
import mongoose from 'mongoose'
import Cities from './model.js'

const app = express()
const PORT = 4200

app.use(cors())
app.options('/cities', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URI_CONNECTION = 'mongodb://127.0.0.1:27017/cities'
const CONNECTION_OPTIONS = {
  maxPoolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.get('/cities', async (req, res) => {
  const citiesList = await Cities.find().exec()
  res.status(200).json(citiesList)
})



app.listen(PORT, async () => {
  mongoose.set('strictQuery', true)
  mongoose
    .connect(URI_CONNECTION, CONNECTION_OPTIONS)
    .then(() => {
      // ADD ONLY ONE TIME
      //   const citiesFile = JSON.parse(fs.readFileSync('./citiesList.json'))
      //   Cities.insertMany(citiesFile)

      console.log('Database connection has been successful')
    })
    .catch((err) => console.log('Error connecting to database', err))

  console.log('Server started on ', PORT)
})
