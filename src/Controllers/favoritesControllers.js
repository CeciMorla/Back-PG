const { Reviews, Viewers, Shows, Theaters, Favorites } = require("../db");

const api = require("../../db.json")


const getAllFavorites = async () => {
const favorites = await Favorites.findAll({
    where: {},
    include: {
      model: Shows,
    },
  });
  if(!favorites.length){
    const favoritesDb = await Favorites.bulkCreate(api.favoritos)
    return favoritesDb;
  }
  //hacer coincidir id del teatro con los shows de ese teatro
  return favorites;
}

module.exports = { getAllFavorites }