let DataTypes = require("sequelize").DataTypes;
let _city = require("../models/City");
let _city_language = require("../models/City_Language");
let _hotel = require("../models/Hotel");
let _language = require("../models/Language");
let _trip = require("../models/Trip");
let _trip_air = require("../models/Trip_Air");
let _trip_cities = require("../models/Trip_Cities");
let _trip_land = require("../models/Trip_Land");

function initModels(sequelize) {
  let city = _city(sequelize, DataTypes);
  let city_language = _city_language(sequelize, DataTypes);
  let hotel = _hotel(sequelize, DataTypes);
  let language = _language(sequelize, DataTypes);
  let trip = _trip(sequelize, DataTypes);
  let trip_air = _trip_air(sequelize, DataTypes);
  let trip_cities = _trip_cities(sequelize, DataTypes);
  let trip_land = _trip_land(sequelize, DataTypes);

  city.belongsToMany(language, { as: 'language_languages', through: city_language, foreignKey: "city", otherKey: "language" });
  city.belongsToMany(trip, { as: 'trip_trips', through: trip_cities, foreignKey: "city", otherKey: "trip" });
  language.belongsToMany(city, { as: 'city_cities', through: city_language, foreignKey: "language", otherKey: "city" });
  trip.belongsToMany(city, { as: 'cities', through: trip_cities, foreignKey: "trip", otherKey: "city" });
  city_language.belongsTo(city, { as: "city_city", foreignKey: "city"});
  city.hasMany(city_language, { as: "city_languages", foreignKey: "city"});
  hotel.belongsTo(city, { as: "city_city", foreignKey: "city"});
  city.hasMany(hotel, { as: "hotels", foreignKey: "city"});
  trip_air.belongsTo(city, { as: "city1_city", foreignKey: "city1"});
  city.hasMany(trip_air, { as: "trip_airs", foreignKey: "city1"});
  trip_air.belongsTo(city, { as: "city2_city", foreignKey: "city2"});
  city.hasMany(trip_air, { as: "city2_trip_airs", foreignKey: "city2"});
  trip_cities.belongsTo(city, { as: "city_city", foreignKey: "city"});
  city.hasMany(trip_cities, { as: "trip_cities", foreignKey: "city"});
  trip_land.belongsTo(hotel, { as: "hotel1_hotel", foreignKey: "hotel1"});
  hotel.hasMany(trip_land, { as: "trip_lands", foreignKey: "hotel1"});
  trip_land.belongsTo(hotel, { as: "hotel2_hotel", foreignKey: "hotel2"});
  hotel.hasMany(trip_land, { as: "hotel2_trip_lands", foreignKey: "hotel2"});
  city_language.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(city_language, { as: "city_languages", foreignKey: "language"});
  trip_air.belongsTo(trip, { as: "trip_trip", foreignKey: "trip"});
  trip.hasOne(trip_air, { as: "trip_air", foreignKey: "trip"});
  trip_cities.belongsTo(trip, { as: "trip_trip", foreignKey: "trip"});
  trip.hasMany(trip_cities, { as: "trip_cities", foreignKey: "trip"});
  trip_land.belongsTo(trip, { as: "trip_trip", foreignKey: "trip"});
  trip.hasOne(trip_land, { as: "trip_land", foreignKey: "trip"});

  /**
   * Returns the city name in the desired language specified by it's iso code as argument. If name in that language is not available, it returns its common name.
   * @param {*} iso-code of lang 
   * @returns 
   */
  city.prototype.nameInLanguage = async function(lang=null){
    if(lang === null) return this.common_name;
    const cityLanguage = await city_language.findOne({
      where: {'city': this.id},
      include: [{
        model: language,
        as: 'language_language',
        where: {iso: lang}
      }],
      attributes: ['name'],
      raw: true
    });
    if(cityLanguage === null) return this.common_name
    return cityLanguage.name;
  }

  return {
    city,
    city_language,
    hotel,
    language,
    trip,
    trip_air,
    trip_cities,
    trip_land,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;