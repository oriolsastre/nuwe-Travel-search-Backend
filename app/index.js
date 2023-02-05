const express = require('express');

const {expressConfig} = require('./config/config')

const {MWs} = require('./middlewares/middlewares')

//Connect and sicronize DB with Sequelize
/* try{
    const {sequelize} = require('./database/connectDB')
    const {initModels} = require('./models/init-models')
    initModels(sequelize)
}catch(e){
    console.log("Error connecting to Database");
    console.log(e.message);
} */

const app = express();
app.use(express.json())


app.get('/', (req,res) => {res.json({page:"Entry point"})})
app.get('/:city', MWs, require('./controllers/getTrips'))

app.use((req, res) => {res.status(404).json({error: "Page not found"})})

app.listen(expressConfig, ()=>{
    console.log(`Listening at: http://${expressConfig.host}:${expressConfig.port}`);
})