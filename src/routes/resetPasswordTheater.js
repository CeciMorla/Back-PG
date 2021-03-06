const nodemailer = require("nodemailer");
const { Router } = require("express");
const { Theaters } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    auth: {
      user: "asalallenaapp@gmail.com",
      pass: "asalallena123",
    },
  });
  let theaterToReset = await Theaters.findOne({
    where: {
      email: email,
    },
  });

  let mailOption = {
    from: "asalallenaapp@gmail.com",
    to: `${theaterToReset.email}`,
    subject: "Recupera tu contraseña",
    html: `<h3>Hola ${theaterToReset.name}</h3> en el siguiente link podras recuperar tu contraseña </br>
        <a href="https://front-pg.vercel.app/resetPasswordTheater/${theaterToReset.id}" target="_blank">www.asalallena.com</a> </br>
        <h4>Sino solicitaste un cambio de contraseña, desestima este correo electronico</h4>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).json(req.body);
      }
    });
  });
});

module.exports = router;
