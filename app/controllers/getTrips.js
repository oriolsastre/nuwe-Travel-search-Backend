const { getTripData } = require('../helpers/getTrips')
const Response = require('../models/Response')

module.exports = async (req,res) => {
    let responseData=[]
    try{
        const trips = req.trips;
        for(let trip of trips){
            const tripData = await getTripData(trip)
            responseData.push(tripData)
        }
    }catch (error) {return res.status(500).json(new Response(500, {message: error.message}, "There was an error", null))}
    res.status(200).json(new Response(200, null, "Ok", responseData))
}