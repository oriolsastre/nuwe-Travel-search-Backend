module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hotel', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stars: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'hotel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_City_Hotel",
        using: "BTREE",
        fields: [
          { name: "city" },
        ]
      },
    ]
  });
};
