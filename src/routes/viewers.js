const { Router } = require("express");
const router = Router();
const {
  postViewersRegistration,
  getAllViewers,
  getViewersById,
} = require("../Controllers/viewersControllers");
const { Viewers, Reviews } = require("../db");

router.post("/", async (req, res, next) => {
  const { name, email, password, image, province } = req.body;
  try {
    const addViewer = await postViewersRegistration(
      name,
      email,
      password,
      image,
      province
    );
    postViewersRegistration
      ? res.status(200).json(addViewer)
      : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allViewers = await getAllViewers();
    allViewers
      ? res.status(200).send(allViewers)
      : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const viewerId = await getViewersById(id);
    viewerId ? res.status(200).json(viewerId) : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body;

  const { id } = req.params;

  try {
    await Viewers.update(changes, {
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
  console.log(req.params)
  const { id } = req.params;
  try {

    await Reviews.destroy({
      where: {
        viewerId: id,
      }
    })

    await Viewers.destroy({
      where: {
        id: id,
      },
    });
    res.send("Viewer deleted succesfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
