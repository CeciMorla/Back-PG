const { Router } = require("express");
const router = Router();
const {
  postShows,
  getAllShows,
  getShowById,
  getShowByName,
} = require("../Controllers/showsControllers");
const { Shows } = require("../db");

router.post("/", async (req, res, next) => {
  console.log(req.body)
  const {
    theaterName, //requeris el nombre
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
  } = req.body;
  
  try {
    const addShow = await postShows(
      theaterName,
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
    );
    postShows ? res.status(200).json(addShow) : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  console.log(req.query);
  try {
    if (name) {
      const showName = await getShowByName(name);
      console.log(showName);
      showName.length
        ? res.status(200).json(showName)
        : res.status(404).send("Error");
    } else {
      const getShows = await getAllShows();
      getShows ? res.status(200).json(getShows) : res.status(404).send("Error");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const detailShow = await getShowById(id);
    res.send(detailShow);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    await Shows.update(changes, {
      where: {
        id: id,
      },
    });
    res.send("Show updated succesfuly!");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Shows.destroy({
      where: {
        id: id,
      },
    });
    res.send("Show deleted succesfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
