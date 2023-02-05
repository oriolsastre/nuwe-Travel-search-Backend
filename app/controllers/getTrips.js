const { searchCitiesID, searchTrips, getTripData } = require('../helpers/getTrips')

module.exports = async (req,res) => {
    const citySearch = req.params.city
    let responseData=[]
    try {
        const cities = await searchCitiesID(citySearch)
            if(cities.length===0) return res.status(200).json({data: `The are no cities matching: ${citySearch}`})
        const trips = await searchTrips(cities)
            if(trips.length===0) return res.status(200).json({data: `No trips found for cities matching ${citySearch}`})
        for(let trip of trips){
            const tripData = await getTripData(trip)
            responseData.push(tripData)
        }
            
    } catch (error) {
        return res.status(500).json({error: "There was an error", message: error.message})
    }

    res.status(200).json({data: responseData})
}