const router = require("express").Router();
const api = require("rapid-api");
const database = require("../db");

router.get("/:searchTerm", async (req, res) => {
  const search = req.params.searchTerm.replace("-", " ");
  const data = await api.searchArtist(search);
  res.json(data);

  let foundDocument = await database.find("Results", search);
  if (foundDocument) {
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

router.get("/:id/details", async (req, res) => {
  const search = req.query.searched.replace("-", " ");
  const id = req.params.id;

  const data = await api.artistOverView(id);
  res.json(data);

  let foundDocument = await database.find("Results", search);
  if (foundDocument.selection) {
    const selectionArray = foundDocument.selection.push({
      id,
      selection: data.profile.name,
    });
    const updatedSelectionArray = { selection: selectionArray };
    console.log(database.updatedSelected)
    await database.update("Results", foundDocument.id, updatedSelectionArray);
  } else {
    const selected = { selection: [{ id, selection: data.profile.name }] };
    await database.update("Results", foundDocument.id, selected);
  }

  console.log(foundDocument);
});

module.exports = router;
