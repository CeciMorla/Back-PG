const { Theaters, Favorites, Viewers, Shows, FavoritesViewers, Tickets, Reviews } = require("../db");
const api = require("../../db.json")

const getAllData = async () =>{
    try {

        const allTheaters = await Theaters.findAll({});
        if (!allTheaters.length) {
            const allTheatersdb = await Theaters.bulkCreate(api.teatros)
        }

        const favorites = await Favorites.findAll({
            where: {},
            include: {
                model: Shows,
            },
        });
        if(!favorites.length){
            const favoritesDb = await Favorites.bulkCreate(api.favoritos)
        }

        const allViewers = await Viewers.findAll({
            include: [
            {
                model: Tickets,
            },
            {
                model: Favorites,
            },
            ],
        });
        
        if(!allViewers.length) {
            const allViewersdb = await Viewers.bulkCreate(api.usuarios)
        }

        const allShows = await Shows.findAll({
            include: [{
                model: Theaters,
            }, {
                model: Tickets,
            }],
        });
        
        if (!allShows.length) {
            const allShowsdb = await Shows.bulkCreate(api.shows)
        }

        const allFavoritesViewers = await FavoritesViewers.findAll({});

        if(!allFavoritesViewers.length) {
            const allFavoritesViewersdb = await FavoritesViewers.bulkCreate(api.favoritesViewers)
        }

        const allTickets = await Tickets.findAll({
            include: [{
                model: Shows
            },{
                model: Viewers
            }]
        });
            if (!allTickets.length) {
                const allTicketsdb = await Tickets.bulkCreate(api.tickets);
            }

        const allReviews = await Reviews.findAll({
            include: [{
                model: Theaters
            },
            {
                model: Shows 
            },
            {
                model: Viewers
            }]
        });
            if(!allReviews.length){ 
                const allReviewsdb = await Reviews.bulkCreate(api.reviews)
            }
            
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllData }