// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const router = require("express").Router();
const { Viewers, Theaters } = require("../db");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "506901482868-h6pf1ffiuv7vicavl8btlunj18oeamjr.apps.googleusercontent.com"
);

//const users = [];

// function upsert(array, item) {
//   const i = array.findIndex(el => el.item === item.email);
//   if (i > -1) array[i] = item;
//   else array.push(item);
// }

router.post("/google/viewer", async (req, res) => {
  const { token } = req.body;
  console.log("token", token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email } = ticket.getPayload();
  //console.log(ticket.getPayload());
  //upsert(users, { name, email, picture })
  const user = await Viewers.findOne({
    where: {
      email,
    },
  });

  user
    ? res.status(201).send({ id: user.id, token })
    : res.status(401).send({ error: "usuario o contraseña incorrectas" });
});

router.post("/google/theater", async (req, res) => {
  const { token } = req.body;
  console.log("token", token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email } = ticket.getPayload();
  //console.log(ticket.getPayload());
  //upsert(users, { name, email, picture })
  const theater = await Theaters.findOne({
    where: {
      email,
    },
  });
  theater
    ? res.status(201).send({ id: theater.id, token })
    : res.status(401).send({ error: "usuario o contraseña incorrectas" });
});

router.post("/theater", async (req, res) => {
  const { email, password } = req.body;
  console.log("teatro", req.body);
  const theater = await Theaters.findOne({
    where: {
      email,
      password
    },
  });
  if (theater) {
    if (password === theater.password && email === theater.email) {
      // const userForToken = {
      //   id: theater.id,
      //   email: theater.email,
      // };

      let isLogged = true;
      // console.log(Logeado ${isLogged});
      // const token = jwt.sign(userForToken, "123");
      // console.log(token);
      // console.log(theater.password);
      // console.log(theater.email);
      // res.send({
      //   id: theater.id,
      //   password: theater.password,
      //   email: theater.email,
      //   isTheater: theater.isTheater,
      //   token,
      // });

      res.status(200).json({ isLogged, id: theater.id, img : theater.image});
    }
  } else {
    res.status(401).send({ error: "usuario o contraseña incorrectas" });
  }
});

router.post("/viewer", async (req, res) => {
  const { email, password } = req.body;

  const viewer = await Viewers.findOne({
    where: {
      email,
      password
    },
  });
  if (viewer) {
    if (password === viewer.password && email === viewer.email) {
      // const userForToken = {
      //   id: viewer.id,
      //   email: viewer.email,
      // };

      let isLogged = true;
      // console.log(Viewer logged{isLogged});

      // const token = jwt.sign(userForToken, "123");
      //console.log(token);
      // res.send({
      //   id: viewer.id,
      //   password: viewer.password,
      //   email: viewer.email,
      //   isViewer: viewer.isViewer,
      //   token,
      // });
      res.status(200).json({ isLogged, id: viewer.id, img: viewer.image });
    }
  } else {
    res.status(401).send({ error: "usuario o contraseña incorrectas" });
  }
});

module.exports = router;
