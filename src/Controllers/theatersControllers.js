const { loadFavorites } = require("../../preload-Db");
const { Theaters, Shows, Reviews, Favorites } = require("../db");
const api = require("../../db.json");

const postTheatersRegistration = async (
  //a la hora de crear un teatro se agrega a favoritos
  name,
  CUIT,
  email,
  password,
  province,
  adress,
  image,
  phoneNumber,
  seatsQTY,
  score
) => {
  try {
    let newFavorite = await Favorites.findOrCreate({
      where: {
        nameTheater: name,
      },
    });
    let newTheater = await Theaters.create({
      name,
      CUIT,
      email,
      password,
      province,
      adress,
      image:
        image !== ""
          ? image
          : "https://us.123rf.com/450wm/pinkcandy/pinkcandy1512/pinkcandy151200027/50002583-siga-el-clavo-rojo-silla-en-un-teatro-gen%C3%A9rica.jpg?ver=6",
      phoneNumber,
      seatsQTY,
      score,
    });
    console.log("este es el teatro creado ", newTheater);
    console.log("teatro agreado a favoritos ", newFavorite);
    return newFavorite;
  } catch (err) {
    console.error(err);
  }
};

const getAllTheaters = async () => {
  const allTheaters = await Theaters.findAll({});
  if (!allTheaters.length) {
    const allTheatersdb = await Theaters.bulkCreate(api.teatros);
    return allTheatersdb;
  }
  return allTheaters;
};

const getTheater = async (id) => {
  console.log(id);
  const theater = await Theaters.findOne({
    where: {
      id: id,
    },
    include: {
      model: Shows,
    },
  });
  return theater;
};

module.exports = { postTheatersRegistration, getAllTheaters, getTheater };
