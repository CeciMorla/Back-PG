const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("reviews", {
    review: {
      type: DataTypes.TEXT,
    },
    theaterScore: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
    showScore: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
  });
};
