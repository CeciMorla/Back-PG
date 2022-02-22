const { Router } = require("express");
const router = Router();
const { Theaters, Shows, Reviews, Favorites } = require("../db");

const {
  postTheatersRegistration,
  getAllTheaters,
  getTheater,
} = require("../Controllers/theatersControllers");

router.post("/", async (req, res, next) => {
  const {
    name,
    CUIT,
    email,
    password,
    province,
    adress,
    image,
    phoneNumber,
    seatsQTY,
    score,
  } = req.body;
  console.log("esto llega del body ", req.body)
  try {
    const addTheater = await postTheatersRegistration(
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
    );
    postTheatersRegistration
      ? res.status(200).json(addTheater)
      : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const getTheaters = await getAllTheaters();

    getTheaters
      ? res.status(200).json(getTheaters)
      : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const detailTheater = await getTheater(id);
    res.send(detailTheater);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    await Theaters.update(changes, {
      where: {
        id: id,
      },
    });
    res.send(changes);
    console.log(changes);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  try {

    await Reviews.destroy({
      where: {
        theaterId: id,
      }
    })

    await Shows.destroy({
      where: {
        theaterId: id,
      }
    })

    await Favorites.destroy({
      where: {
        id: id,
      }

    })

    await Theaters.destroy({
      where: {
        id: id,
      },
    });
    
    res.send("Theater deleted succesfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
