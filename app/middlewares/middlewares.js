const { detectChinese } = require('../helpers/language')
const { searchCities, searchTrips } = require('../helpers/getTrips')
const Response = require('../models/Response')

/**
 * Check the length of the input. It must be at least 3 characters unless it's detected as chinese, when any length will be accepted.
 */
const checkLength = (req,res,next) => {
    const input = req.params.city;
    /* Since chinese kanjis can have more meaning than a single character, a short chinese input can already be meaningful to search for a city */
    if(detectChinese(input)) return next()
    if(input.length>=3) return next()
    return res.status(400).json(new Response(400, {message: "Input too short. It must be at least 3 characters long"}, "There was an error", null))
}

/**
 * Check if there exists any cities matching the input substring.
 */
const checkCities = async (req,res,next) => {
    const citySearch = req.params.city
    try {
        const cities = await searchCities(citySearch)
        if(cities.length===0) return res.status(200).json(new Response(200, null, `The are no cities matching: ${citySearch}`, []))
        req.cities = cities;
        return next(); 
    }catch (error) {return res.status(500).json(new Response(500, {message: error.message}, "There was an error", null))}
}

/**
 * Check if there are any trips containing the cities specified by the array of city IDs on req.citiesID
 */
const checkTrips = async (req,res,next) => {
    const citiesID = req.cities.map(city => city.id);
    try {
        const trips = await searchTrips(citiesID)
        if(trips.length===0) return res.status(200).json(new Response(200, null, `No trips found for cities matching: ${citySearch}`, []))
        req.trips = trips;
        return next();
    }catch (error) {return res.status(500).json(new Response(500, {message: error.message}, "There was an error", null))}
    
}

const MWs = [checkLength, checkCities, checkTrips]

module.exports = { MWs }