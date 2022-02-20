const { Router } = require("express");
const router = Router();
const {
  postReviews,
  getAllReviews,
} = require("../Controllers/reviewsControllers");

router.post("/", async (req, res, next) => {
  const { review, theaterScore, showScore, nameViewer, nameTheater, nameShow } =
    req.body;
  try {
    const addReview = await postReviews(
      review,
      theaterScore,
      showScore,
      nameViewer,
      nameTheater,
      nameShow
    );
    addReview ? res.status(200).json(addReview) : res.status(404).send("Error");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allReviews = await getAllReviews();
    res.send(allReviews);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
