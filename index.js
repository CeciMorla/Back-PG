const server = require("./src/app.js");
const { PORT } = process.env;
const { conn } = require("./src/db.js");
const { getAllData } = require("./src/Controllers/allDataController")
// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {

  getAllData();

  server.listen(PORT || 3001, () => {
    console.log("%s listening at 3001 - Data base loaded."); // eslint-disable-line no-console
  });
});
