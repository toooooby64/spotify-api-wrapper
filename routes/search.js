const router = require("express").Router();
const api = require("./api");
const database = require("../db");

router.get("/:searchTerm", async (req, res) => {
  const search = req.params.searchTerm.replace("-", " ");
  const test = await api.searchArtist(search);
  res.json(test);
  database.connect();
});

module.exports = router;
