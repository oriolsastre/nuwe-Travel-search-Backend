const { Op, Model } = require("sequelize");
const { sequelize } = require('../database/connectDB')
const { initModels } = require('../models/init-models')
const Models = initModels(sequelize)

/**
 * Search cities that match the given partial name.
 * @param {*} partial_name 
 * @returns Array with the city ids matching the given partial name.
 */
const searchCitiesID = async (partial_name) =>  {
    const cities = await Models.city_language.findAll({where: {name: {[Op.substring]: `${partial_name}`}}, group: 'city', attributes: ['city']});
    let citiesID = []
    cities.forEach(element => {citiesID.push(element.city)});
    return citiesID
}

/**
 * Given an array of city ids, find those trips which include those cities
 * @param {*} Array of city ids
 * @returns Array of trips matching conditions.
 */
const searchTrips = async (cities) => {
    const validTripID = await Models.trip_cities.findAll({where: {city: {[Op.in]: cities}}, attributes: ['trip'], group: 'trip', raw: true})
    const arrayTripID = validTripID.map(({trip}) => trip)

    const trips = await Models.trip.findAll({
        include: [{
            model: Models.city,
            as: 'cities',
            required: true
        }],
        where: {id: {[Op.in]: arrayTripID}}
    })
    return trips;
}

/**
 * Given a trip, get the data required: name; [air/land]; days; cities; [hotels/departures] 
 * @param {*} trip 
 * @returns Data of the trip
 */
const getTripData = async (trip) => {
    const tripData = {name: trip.name, type: trip.type, days: trip.days, cities: [], details: null};
    trip.cities.forEach(city => tripData.cities.push(city.common_name))
    if(trip.type==='land'){
        tripData.details = await getHotelsfromTrip(trip.id)
    }else if(trip.type==='air'){
        tripData.details = await getFlightsFromTrip(trip.id)
    }
    return tripData;
}
/**
 * Given a land_trip id, get the hotels included on that trip.
 * @param {} tripID
 * @returns Array of hotels
 */
const getHotelsfromTrip = async (tripID) => {
    const hotels = await Models.trip_land.findOne({
        include:[{
            model: Models.hotel,
            as: 'hotel1_hotel',
            include: [{
                model: Models.city,
                as: 'city_city'
            }]
        },{
            model: Models.hotel,
            as: 'hotel2_hotel',
            include: [{
                model: Models.city,
                as: 'city_city'
            }]
        }],
        where: {trip: tripID}
    })
    return [
        {hotel: hotels.hotel1_hotel.name, stars:hotels.hotel1_hotel.stars, city: hotels.hotel1_hotel.city_city.common_name},
        {hotel: hotels.hotel2_hotel.name, stars:hotels.hotel2_hotel.stars, city: hotels.hotel2_hotel.city_city.common_name}
    ]
}

/**
 * Given an air_trip id, get the flights included on that trip.
 * @param {} tripID
 * @returns Array of flights
 */
const getFlightsFromTrip = async (tripID) => {
    const flights = await Models.trip_air.findOne({
        include:[{
            model: Models.city,
            as: 'city1_city'
        },{
            model: Models.city,
            as: 'city2_city'
        }],
        where: {trip: tripID}
    })
    return [
        {departure_city: flights.city1_city.common_name, departure_time: flights.departure1},
        {departure_city: flights.city2_city.common_name, departure_time: flights.departure2}
    ]
}

module.exports = { searchCitiesID, searchTrips, getTripData }