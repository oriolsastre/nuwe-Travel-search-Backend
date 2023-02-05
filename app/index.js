const express = require('express');

const {sequelize} = require('./database/connectDB')
const {expressConfig} = require('./config/config')

const {MWs} = require('./middlewares/middlewares')

sequelize.sync().catch(err => console.log(err))

const app = express();
app.use(express.json())


app.get('/', (req,res) => {res.json({page:"Entry point"})})
app.get('/:city', MWs, require('./controllers/getCity'))

app.use((req, res) => {res.status(404).json({error: "Page not found"})})

app.listen(expressConfig, ()=>{
    console.log(`Listening at: http://${expressConfig.host}:${expressConfig.port}`);
})