var DataTypes = require("sequelize").DataTypes;
var _city = require("./city");
var _city_language = require("./city_language");
var _hotel = require("./hotel");
var _language = require("./language");
var _trip = require("./trip");
var _trip_air = require("./trip_air");
var _trip_cities = require("./trip_cities");
var _trip_land = require("./trip_land");

function initModels(sequelize) {
  var city = _city(sequelize, DataTypes);
  var city_language = _city_language(sequelize, DataTypes);
  var hotel = _hotel(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var trip = _trip(sequelize, DataTypes);
  var trip_air = _trip_air(sequelize, DataTypes);
  var trip_cities = _trip_cities(sequelize, DataTypes);
  var trip_land = _trip_land(sequelize, DataTypes);

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
