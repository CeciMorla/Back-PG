const { Shows, Tickets, Reviews, Theaters, Favorites } = require("../db");
const { Op } = require("sequelize");

const api = require("../../db.json")

const postShows = async (
  theaterName, //pasas el nombre del teatro
  name,
  genre,
  length,
  image,
  summary,
  ticketsQty,
  seatsAvailable,
  rated,
  date,
  time,
  score,
  originPrice
) => {
  try {
    let newShow = await Shows.create({
      name,
      genre,
      length,
      image,
      summary,
      ticketsQty,
      seatsAvailable,
      rated,
      date,
      time,
      score,
      originPrice,
    });
    //console.log(theaterName);
    const theater = await Theaters.findOne({
      where: {
        name: theaterName,
      },
    });
    //console.log(theater);
    await theater.addShows(newShow);
    const favorite = await Favorites.findOne({
      where: {
        nameTheater: theaterName,
      },
    });
    await favorite.addShows(newShow);

    return newShow;
  } catch (err) {
    console.error(err);
  }
};

const getAllShows = async () => {
  //console.log("esto es api.shows ", api.shows)
  const allShows = await Shows.findAll({
    include: [{
      model: Theaters,
    }, {
      model: Tickets,
    }],
  });

  if (!allShows.length) {
    const allShowsdb = await Shows.bulkCreate(api.shows)
    return allShowsdb
  }
  //console.log(allShows)
  return allShows;
}

const getShowByName = async (name) => {
  try {
    let showName = await Shows.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Theaters,
      },
    });
    return showName;
  } catch (error) {
    console.log(error);
  }
};

const getShowById = async (id) => {
  const show = await Shows.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Theaters,
      },
      {
        model: Tickets,
      },
    ],
  });
  return show;
};

module.exports = { postShows, getAllShows, getShowById, getShowByName };
