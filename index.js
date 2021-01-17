const express = require('express')
const BodyParser = require('body-parser')
const eventouRouter = require('./routes/eventoRoute')
const participanteRouter = require('./routes/participanteRoute')
const app = express()
const port = 3000

app.use(BodyParser.urlencoded({extended: false}))

eventouRouter(app)
participanteRouter(app)

app.listen(port, ()=> console.log('API ON.........'))