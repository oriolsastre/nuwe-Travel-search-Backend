module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trip_cities', {
    trip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'trip',
        key: 'id'
      }
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    ordre: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'trip_cities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip" },
          { name: "city" },
        ]
      },
      {
        name: "FK_City_TripCities",
        using: "BTREE",
        fields: [
          { name: "city" },
        ]
      },
    ]
  });
};
