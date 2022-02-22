const { Reviews, Viewers, Shows, Theaters, Favorites } = require("../db");

const api = require("../../db.json")


const getAllFavorites = async () => {
const favorites = await Favorites.findAll({
  order: ["id"],
    where: {},
    include: {
      model: Shows,
    },
  });
  //hacer coincidir id del teatro con los shows de ese teatro
  return favorites;
}

module.exports = { getAllFavorites }