const { Favorites, Shows, Viewers, Theaters } = require("../db");

const router = require("express").Router();
const api = require("../../db.json")

router.get("/", async (req, res) => {
  const favorites = await Favorites.findAll({
    where: {},
    include: {
      model: Shows,
    },
  });
  if(!favorites.length){
    const favoritesDb = await Favorites.bulkCreate(api.favoritos)
    res.send(favoritesDb);
  }
  //hacer coincidir id del teatro con los shows de ese teatro
  res.send(favorites);
});

// const getTheater = async (id) => {
//     const theater = await Theaters.findOne({
//       where: {
//         id: id
//       },
//       include: {
//         model: Shows
//       }
//     })
//     return theater
//   }

router.post("/:idViewer", async (req, res) => {
  const { idViewer } = req.params;

  const { nameTheater } = req.body;

  const addFavorites = await Favorites.findOrCreate({
    where: {
      nameTheater: nameTheater,
    },
  });
  console.log(addFavorites);
  const viewer = await Viewers.findOne({
    where: {
      id: idViewer,
    },
  });
  console.log(viewer);
  await viewer.addFavorites(addFavorites[0]);

  res.send(addFavorites);
});

module.exports = router;
