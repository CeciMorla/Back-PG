const { Viewers, Tickets, Favorites } = require("../db");
const api = require("../../db.json");

const postViewersRegistration = async (
  name,
  email,
  password,
  image,
  province
) => {
  try {
    console.log(Viewers);
    let newViewer = await Viewers.create({
      name,
      email,
      password,
      image:
        image !== ""
          ? image
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKwu1xab-FP5z_TqMTXJVTC3mSQDrsVGuSpSkuIkSd4AUFZ5QSoiQYkFJ6JSRmj-0CBBI&usqp=CAU",
      province,
    });
    console.log(Viewers);
    return newViewer;
  } catch (err) {
    console.error(err);
  }
};

const getAllViewers = async () => {
  try {
    const allViewers = await Viewers.findAll({
      include: [
        {
          model: Tickets,
        },
        {
          model: Favorites,
        },
      ],
    });

    if (!allViewers.length) {
      const allViewersdb = await Viewers.bulkCreate(api.usuarios);
      return allViewersdb;
    }
    return allViewers;
  } catch (error) {
    console.log(error);
  }
};
const getViewersById = async (id) => {
  try {
    let viewerID = await Viewers.findByPk(id, {
      include: {
        model: Tickets,
      },
    });
    return viewerID;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { postViewersRegistration, getAllViewers, getViewersById };
