const nodemailer = require("nodemailer");
const { Router } = require("express");
const { Viewers } = require("../db");
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
  let viewerToReset = await Viewers.findOne({
    where: {
      email: email,
    },
  });

  let mailOption = {
    from: "asalallenaapp@gmail.com",
    to: `${viewerToReset.email}`,
    subject: "Recupera tu contraseña",
    html: `<h3>Hola ${viewerToReset.name}</h3> en el siguiente link podras recuperar tu contraseña </br>
        <a href="https://front-pg.vercel.app/resetPasswordViewer/${viewerToReset.id}" target="_blank">www.asalallena.com</a> </br>
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
