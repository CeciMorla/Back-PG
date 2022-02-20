const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Favorites", {
    nameTheater: {
      type: DataTypes.STRING,
    },
  });
};
