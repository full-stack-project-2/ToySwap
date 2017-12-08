module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      is: ["^[a-z]+$", 'i'],
      validate: {
        len: [1]
      }
    },
    cityState: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        len: [3]
      }
    },
  });

  User.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Inventory, {
      onDelete: "cascade"
    });
  };

  return User;
};

// User
// City/ State
// email
// // Wish list /UPDATE Tbl SET Col = Col + 'suffix' WHERE ...
