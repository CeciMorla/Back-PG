const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("viewers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    image: {
      type: DataTypes.TEXT,
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
    isViewer: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
