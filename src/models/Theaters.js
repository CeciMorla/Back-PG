const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("theaters", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CUIT: {
      type: DataTypes.STRING,
      allowNull: false, //Seria Pk???
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.ENUM(
        "Buenos Aires",
        "Cordoba",
        "Santa Fe",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Corrientes",
        "Entre Rios",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquen",
        "Rio Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santiago del Estero",
        "Tierra del Fuego",
        "Tucuman",
        "CABA"
      ),
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
    },
    seatingLayout: {
      type: DataTypes.TEXT,
    },
    isTheater: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
