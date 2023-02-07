const express = require('express');
const cors = require('cors')
const {expressConfig} = require('./config/config')
const {MWs} = require('./middlewares/middlewares')
const Response = require('./models/Response')

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {res.json(new Response(200, null, "Entry point", null))})
app.get('/:city', MWs, require('./controllers/getTrips'))

app.use((req, res) => {res.status(404).json(new Response(404, {message: "Page not found"}, "There was an error", null))})

app.listen(expressConfig, ()=>{
    console.log(`Listening at: http://${expressConfig.host}:${expressConfig.port}`);
})