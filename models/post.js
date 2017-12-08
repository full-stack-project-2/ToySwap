module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define("Inventory", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    
  },{
    freezeTableName: true,
  });
  Inventory.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Inventory.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Inventory;
};


// Title of Item
// condition: (3 vals) in -bag)
// Availablity (count)
// MSRP (retail price)
// url for img
// Description


