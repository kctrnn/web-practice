require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./config/db')

const app = express()
const port = process.env.PORT || 3000

// connect to mongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// routes
const challengeRoute = require('./routes/challenges')
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const solutionRoute = require('./routes/solutions')
const userRoute = require('./routes/users')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/challenges', challengeRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/solutions', solutionRoute)
app.use('/api/users', userRoute)

app.get('/test', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
