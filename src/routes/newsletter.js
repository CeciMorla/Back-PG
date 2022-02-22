const nodemailer = require("nodemailer");
const { Router } = require("express");
const { Viewers, Favorites } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { nameTheater } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    auth: {
      user: "asalallenaapp@gmail.com",
      pass: "asalallena123",
    },
  });
  let allViewers = await Viewers.findAll({
    where: {
      isSubscribed: true,
    },
    include: {
      model: Favorites,
    },
  });

  let allFavorites = await Favorites.findAll({
    where: {
      nameTheater: nameTheater,
    },
  });

  let filteredViewers = allViewers?.filter((el) =>
    el.Favorites?.find((e) => e.nameTheater === nameTheater)
  );

  filteredViewers?.map((viewers) => {
    allFavorites?.map((fav) => {
      let mailOption = {
        from: "A Sala Llena",
        to: `${viewers.email}`,
        subject: "Hay una nueva obra en tu teatro favorito",
        html: `<h3>Hola ${viewers.name}</h3> <br/> 
          <h4>${fav.nameTheater} acaba de publicar una obra</h4> <br/>
          <h4>Entra a este link para ver mas informacion</h4> <br/>

          <a href="https://front-pg.vercel.app" target="_blank">www.asalallena.com</a> </br>
         `,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).json(req.body); //shows <---> province
        }
      });
    });
  });
});

module.exports = router;
