const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000

const bodyParser = require('body-parser');

const db = require('./orm/index.js')
const routersTalents = require("./routes/talents.js")
const routerFreelance = require("./routes/freelance.js")
const routesClient = require("./routes/client.js")
const routesClientTalent= require("./routes/clientTalent.js")
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello new Projekt")
})


app.use('/api/freelance', routerFreelance)
app.use('/api/client', routesClient)
app.use('/api/talents', routersTalents)
app.use('/api/clienttalent',routesClientTalent)

app.listen(  port, () => {
    console.log(`server listenning on port ${port}`)
})