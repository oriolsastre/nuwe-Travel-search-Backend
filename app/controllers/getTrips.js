const { getTripData } = require('../helpers/getTrips')
const Response = require('../models/Response')

module.exports = async (req,res) => {
    try{
        let responseData=[]
        let okMessage = `Matching '${req.params.city}' in: `
        req.cities.forEach((city, i) => {
            if(i>0){okMessage+=', '}
            okMessage+=`${city.name}`
        })
        const trips = req.trips;
        for(let trip of trips){
            const tripData = await getTripData(trip)
            responseData.push(tripData)
        }
        res.status(200).json(new Response(200, null, okMessage, responseData))
    }catch (error) {return res.status(500).json(new Response(500, {message: error.message}, "There was an error", null))}
}