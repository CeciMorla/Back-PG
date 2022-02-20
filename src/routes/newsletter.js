const nodemailer = require("nodemailer");
const { Router } = require("express");
const { Viewers, Favorites, Shows } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { nameTheater } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "elena.wuckert95@ethereal.email",
      pass: "R2MdTagJTnnFFazbGQ",
    },
  });
  //if viewer subscribed && viewer tiene favorite -- cuando hay post de Shows de Theater   --> newsletter / else-> newsletter - teatros de tu provincia
  // dispatch desde el front una action que sea el post newsletter
  // en el front put viewer actualizaria el isSusbcribed a true

  // Favorites nombre del teatro, n

  let allViewers = await Viewers.findAll({
    where: {
      isSubscribed: true, // buscar si esta suscripto y que tenga al teatro que hace el post como favorito
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

          <a href="http://localhost:3000" target="_blank">www.asalallena.com</a> </br>
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
