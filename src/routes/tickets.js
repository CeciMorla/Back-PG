const { Router } = require("express");
const { Tickets, Shows, Viewers } = require("../db");
const {
  getAllTickets,
  postTickets,
} = require("../Controllers/ticketsControllers");
const router = Router();

  // SDK de Mercado Pago
  const mercadopago = require("mercadopago");
  // Agrega credenciales
  mercadopago.configure({
    //access_token:"TEST-4897216680136890-020912-428eee3e2c74fb3f30d970976a0166ce-392112530" 
    access_token:"APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410", //poner token
  });

router.get("/", async (req, res, next) => {
  const allTickets = await getAllTickets();
  res.send(allTickets);
});

router.post("/", async (req, res, next) => {
  const { price, seatNumber, nameShow, nameViewer } = req.body;
  //console.log(req.body);
  try {
    const newTicket = await postTickets(
      price,
      seatNumber,
      nameShow,
      nameViewer
    );
    res.send(newTicket);
  } catch (error) {
    console.log(error);
  }
});

router.post("/pay", async (req, res) => {
try {
  console.log(req.body)
  const { seatNumber, showId, idViewer } = req.body;
  const idShow = Buffer.from(showId)
  const encodeIdSHow = idShow.toString('base64')
  const viewerId = Buffer.from(idViewer)
  const encodeIdViewer = viewerId.toString('base64')
  //console.log('encodeIdSHow',encodeIdSHow)
  //console.log('encodeIdViewer',encodeIdViewer)
  
  const allTickets = await Tickets.findAll({
    where: {
      showId: showId,
    }
  })
  const tickets = allTickets.filter( t => seatNumber.find(s => s === t.seatNumber))
  
  if (idViewer) {
    let viewer = await Viewers.findOne({
      where: {
        id: idViewer,
      },
    });
    viewer.addTickets(tickets);
  }
  let preference = {
    items: [],
    back_urls: {
      success: `https://front-pg.vercel.app/ticket/finish/${encodeIdViewer}/${encodeIdSHow}/${seatNumber}`,
      failure: `https://front-pg.vercel.app/ticket/finish/${encodeIdViewer}/${encodeIdSHow}/${seatNumber}`,
      pending: `https://front-pg.vercel.app/ticket/finish/${encodeIdViewer}/${encodeIdSHow}/${seatNumber}`,
    },
    auto_return: "approved",
  };
    
  tickets?.forEach(e => {
    preference.items.push({
      title: e.seatNumber,
      unit_price: e.price,
      quantity: 1
    })
  });
  //console.log(preference.items)
  const response = await mercadopago.preferences.create(preference);
  //console.log(response.body);
  const preferenceId = response.body.sandbox_init_point;
  res.send(preferenceId);
} catch (error) {
  console.log(error)
}
  
});

router.get("/finish/:decodIdN/:decodIdVn/:seatNumber/:status", async function (req, res) {

  
  
  const { decodIdN, seatNumber, status, decodIdVn } = req.params
  //console.log(atob(showId));
  //const idShow = Buffer.from(showId,'base64')
  //const decodIdShow = idShow.toString('ascii');
  //console.log('decodIdShow',decodIdShow)
  const array = seatNumber.split(",")
  console.log('esto trae por params al redirigirte', req.params)
  if(status === "approved"){
    const show = await Shows.findOne({ //busco el show
      where: {
        id : decodIdN
      },
      include: {
        model: Tickets,
      },
    })
    console.log("este es el total inicial ", show.dataValues.total)
    const tickets = await Tickets.findAll({ //busco los tickets del show
      where: {
        showId : decodIdN
      }
    })

    for( let i = 0; i < tickets.length; i++) { // comparo todos los tickets con los que compré
      for (let j = 0; j < array.length; j++) {
        if (tickets[i].dataValues.seatNumber === array[j]) {
          tickets[i].dataValues.sold = true // si coinciden le cambio la propiedad "sold" a true
        }
      }
    }

    tickets.map(async t => {
      await Tickets.update(t.dataValues, { // actualizo de a uno los tickets
        where: {
          id : t.dataValues.id
        }
      })
    })

    const entradasCompradas = tickets.filter( t => t.dataValues.sold === true)
    var newTotal = show.dataValues.total
    for (let i = 0; i < entradasCompradas.length; i++) {
      //console.log(entradasCompradas[i].dataValues.price)
      newTotal = newTotal + entradasCompradas[i].dataValues.price
      //newTotal = newTotal + entradasCompradas[i].dataValues.price
      //return newTotal
    }
    console.log(newTotal)
    //console.log("estas son  las entradas ", entradasCompradas)

    const asientos = show.seatsAvailable // me guardo los asientos que figuran disponibles
    
    const actualizacion = asientos?.filter( el => { // los comparo con los que voy a comprar y los saco del array
    
      if (array.indexOf(el) < 0) return el
    });
  
    const updateShow = show.dataValues // entro a los datos del show
    
    for (let clave in updateShow){
      if (clave === "seatsAvailable"){
        updateShow[clave] = actualizacion // si encuentro la key de los asientos disponibles, lo reemplazo por el nuevo array
      }
      if (clave === "total") {
        updateShow[clave] = newTotal
      }
    }

    await Shows.update(updateShow, { // actualizo el show
      where: {
        id: decodIdN,
      },
    })
  }
  res.json({
    Status: req.query.status,
  });
});

router.put("/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    await Tickets.update(changes, {
      where: {
        id: id,
      },
    });
    res.send("Tickets updated succesfully!");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tickets.destroy({
      where: {
        id: id,
      },
    });
    res.send("entrada eliminada");
  } catch (error) {
    console.log;
  }
});

module.exports = router;
