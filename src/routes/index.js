const { Router } = require("express");

const reviews = require("./reviews");
const shows = require("./shows");
const theaters = require("./theaters");
const tickets = require("./tickets");
const viewers = require("./viewers");
const login = require("./login");
const newsletter = require("./newsletter");
const resetPasswordViewer = require("./resetPasswordViewer");
const resetPasswordTheater = require("./resetPasswordTheater");

const favorites = require("./favorites");

const router = Router();

// Configurar los routers

router.use("/reviews", reviews);
router.use("/shows", shows);
router.use("/theaters", theaters);
router.use("/tickets", tickets);
router.use("/viewers", viewers);
router.use("/login", login);
router.use("/newsletter", newsletter);
router.use("/resetPasswordViewer", resetPasswordViewer);
router.use("/resetPasswordTheater", resetPasswordTheater);
router.use("/favorites", favorites);

module.exports = router;
