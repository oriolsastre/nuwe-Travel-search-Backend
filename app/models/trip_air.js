module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trip_air', {
    trip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'trip',
        key: 'id'
      }
    },
    city1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    departure1: {
      type: DataTypes.TIME,
      allowNull: true
    },
    city2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    departure2: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'trip_air',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip" },
        ]
      },
      {
        name: "FK_City1_TripLand",
        using: "BTREE",
        fields: [
          { name: "city1" },
        ]
      },
      {
        name: "FK_City2_TripLand",
        using: "BTREE",
        fields: [
          { name: "city2" },
        ]
      },
    ]
  });
};
