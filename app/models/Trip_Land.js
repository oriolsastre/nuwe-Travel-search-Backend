module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trip_land', {
    trip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'trip',
        key: 'id'
      }
    },
    hotel1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hotel',
        key: 'id'
      }
    },
    hotel2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hotel',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'trip_land',
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
        name: "FK_Hotel1_TripLand",
        using: "BTREE",
        fields: [
          { name: "hotel1" },
        ]
      },
      {
        name: "FK_Hotel2_TripLand",
        using: "BTREE",
        fields: [
          { name: "hotel2" },
        ]
      },
    ]
  });
};
