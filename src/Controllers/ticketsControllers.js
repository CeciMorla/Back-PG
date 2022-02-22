const { Viewers, Shows, Tickets, Reviews } = require("../db");

const api = require("../../db.json")

const postTickets = async (price, seatNumber, nameShow, idViewer) => {
  //console.log(nameShow)
  //console.log('hola')
  try {
    let newTicket = await Tickets.create({
      price,
      seatNumber,
    });
    if(nameShow){
    const show = await Shows.findOne({
      where: {
        name: nameShow,
      },
    });
    await show.addTickets(newTicket);
    //console.log(show)
  }
    if(idViewer) {  
    let viewer = await Viewers.findOne({
      where: {
        id: idViewer,
      },
    });
    await viewer.addTickets(newTicket);
  }
    return newTicket;
  } catch (err) {
    console.error(err);
  }
};

const getAllTickets = async () => {
  const allTickets = await Tickets.findAll({
  order: ["id"],
  include: [{
    model: Shows
  },{
    model: Viewers
  }]
});
  if (!allTickets.length) {
    const allTicketsdb = await Tickets.bulkCreate(api.tickets);
    return allTicketsdb;
  }
  return allTickets;
}

module.exports = { postTickets, getAllTickets };
