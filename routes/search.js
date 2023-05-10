const router = require("express").Router();
const api = require("./api");
const database = require("../db");

router.get("/:searchTerm", async (req, res) => {
  const search = req.params.searchTerm.replace("-", " ");
  const data = await api.searchArtist(search);
  res.json(data);

  let foundDocument = database.find("Results", search);
  if (foundDocument.lastSearched) {
    const data = { lastSearched: new Date() };
    await database.update("Results", foundDocument.id, data);
  } else {
    foundDocument = {
      searchTerm: search,
      searchCount: data.results.length,
      lastSearched: new Date(),
    };
    database.save("Results", foundDocument);
  }
  console.log(foundDocument);
});

module.exports = router;
