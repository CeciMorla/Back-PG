const server = require("./src/app.js");
const { PORT } = process.env;
const { conn } = require("./src/db.js");
const { getAllTheaters } = require("./src/Controllers/theatersControllers")
const { getAllViewers } = require("./src/Controllers/viewersControllers")
const { getAllShows } = require("./src/Controllers/showsControllers")
const { getAllTickets } = require("./src/Controllers/ticketsControllers")
const { getAllReviews } = require("./src/Controllers/reviewsControllers")
const { getAllFavorites } = require("./src/Controllers/favoritesControllers")
const { getAllFavoritesViewers } = require("./src/Controllers/favoritesViewersControllers")
// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  // getAllTheaters();
  // getAllFavorites();
  // getAllViewers();
  // getAllShows();
  getAllFavoritesViewers();
  // getAllTickets();
  // getAllReviews();
  

  server.listen(PORT || 3001, () => {
    console.log("%s listening at 3001 - Data base loaded."); // eslint-disable-line no-console
  });
});
